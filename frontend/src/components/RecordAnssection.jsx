import Webcam from 'react-webcam';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import moment from 'moment';
import { API } from '@/utils/Api';

function RecordAnssection({ Mockinterviewquestions, activequestionindex, interviewData, interviewid }) {
  const mockId = interviewid;
  const [useranswer, setuseranswer] = useState("");
  const [loading, setloading] = useState(false);
  const hasSavedRef = useRef(false);

  const getUserEmail = () => {
    return localStorage.getItem('userEmail') || "example@gmail.com";
  };

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  useEffect(() => {
    if (results && results.length > 0) {
      // Combine all transcripts
      const fullTranscript = results.map(result => result.transcript).join(' ');
      setuseranswer(fullTranscript);
    }
  }, [results]);

  // Reset saved flag when question changes
  useEffect(() => {
    hasSavedRef.current = false;
    setuseranswer('');
    setResults([]);
  }, [activequestionindex]);

  const UpdateUserAnswer = useCallback(async () => {
    if (!useranswer || useranswer.trim().length < 10 || hasSavedRef.current) {
      return;
    }

    hasSavedRef.current = true;
    setloading(true);

    const question = Mockinterviewquestions[activequestionindex]?.question || "";
    const correctAns = Mockinterviewquestions[activequestionindex]?.answer || "";
    const userAns = useranswer.trim();
    const userEmail = getUserEmail();

    try {
      const feedbackRes = await API({
        method: 'POST',
        url: '/gemini/feedback',
        data: { question, userAns },
      });

      const feedbackData = feedbackRes.data;
      if (!feedbackData.success) {
        throw new Error(feedbackData.error || 'Failed to get feedback');
      }

      const jsonFeedbackResp = feedbackData.data;
      const feedback = jsonFeedbackResp?.feedback || "";
      const rating = jsonFeedbackResp?.rating?.toString() || "";

      await API({
        method: 'POST',
        url: '/userAnswer',
        data: {
          mockId,
          question,
          correctAns,
          userAns,
          feedback,
          rating,
          userEmail,
          createdAt: moment().format("DD-MM-YYYY"),
        },
      });

      toast.success("Answer recorded successfully!");
      setuseranswer('');
      setResults([]);
    } catch (error) {
      console.error("Error updating answer:", error);
      toast.error(error.message || "Failed to record answer");
      hasSavedRef.current = false;
    } finally {
      setloading(false);
    }
  }, [useranswer, Mockinterviewquestions, activequestionindex, mockId, setResults]);

  useEffect(() => {
    // Only save when recording stops and we have a meaningful answer
    if (!isRecording && useranswer && useranswer.trim().length > 10 && !hasSavedRef.current) {
      UpdateUserAnswer();
    }
  }, [isRecording, useranswer, UpdateUserAnswer]);

  const StartStopRecording = (e) => {
    if (e) e.preventDefault();
    if (isRecording) {
      stopSpeechToText();
      hasSavedRef.current = false; // Reset when starting new recording
    } else {
      hasSavedRef.current = false; // Reset when starting new recording
      setuseranswer(''); // Clear previous answer
      setResults([]); // Clear previous results
      startSpeechToText();
    }
  };


  return (
    <div className='flex items-center justify-center flex-col space-y-6'>
      <div className='flex flex-col justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 shadow-lg border border-gray-200 w-full'>
        <Webcam
          audio={false}
          mirrored={true}
          style={{
            height: 300,
            width: "100%",
            borderRadius: '0.5rem',
            objectFit: 'cover'
          }}
        />
      </div>

      <div className='w-full space-y-4'>
        {error && (
          <div className='p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm'>
            {error}
          </div>
        )}

        {useranswer && (
          <div className='p-4 bg-blue-50 border border-blue-200 rounded-lg'>
            <p className='text-sm font-medium text-blue-900 mb-2'>Your Answer:</p>
            <p className='text-sm text-blue-800'>{useranswer}</p>
          </div>
        )}

        <Button type="button"
          disabled={loading}
          variant={isRecording ? "destructive" : "default"}
          className={`w-full h-12 text-base font-medium ${isRecording
            ? 'bg-red-600 hover:bg-red-700 animate-pulse'
            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
            }`}
          onClick={StartStopRecording}
        >
          {loading ? (
            <span className='flex items-center gap-2'>
              <Loader2 className='animate-spin' size={20} />
              Processing...
            </span>
          ) : isRecording ? (
            <span className='flex items-center gap-2'>
              <Mic className='animate-pulse' size={20} />
              Stop Recording
            </span>
          ) : (
            <span className='flex items-center gap-2'>
              <Mic size={20} />
              Start Recording
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}

export default RecordAnssection;
