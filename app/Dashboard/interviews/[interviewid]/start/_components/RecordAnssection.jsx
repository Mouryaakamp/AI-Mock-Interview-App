"use client"

import Webcam from 'react-webcam'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react';
import { toast } from 'sonner';
import { ChatSession, chatSessionPromise } from '@/utils/GeminiAIModel';
import { useUser } from '@clerk/nextjs';
import { UserAnswer } from '@/utils/schema';
import moment from 'moment';
import { useParams } from "next/navigation";

function RecordAnssection({ Mockinterviewquestions, activequestionindex, interviewData }) {

    const { interviewid } = useParams(); // gets the value from URL
    const mockId = interviewid;
    const [useranswer, setuseranswer] = useState("");
    const { user } = useUser()
    const [loading, setloading] = useState(false)
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
        results.map((result) => (
            setuseranswer(prevAns => result?.transcript)
        ))
    }, [results])

    useEffect(() => {
        if (!isRecording && useranswer.length > 10) {
            UpdateUserAnswer();
        }
    }, [useranswer])

    const StartStopRecording = async () => {
        if (isRecording) {
            
            stopSpeechToText();

        } else {

            startSpeechToText();
        }
    };


    const UpdateUserAnswer = async () => {
        setloading(true);

        const question = Mockinterviewquestions[activequestionindex]?.question || "";
        const correctAns = Mockinterviewquestions[activequestionindex]?.answer || "";
        const userAns = useranswer;
        const userEmail = user?.primaryEmailAddress?.emailAddress || "";

        const feedbackprompt = `
You are a strict JSON generator.  
Given the interview question and the user's answer, rate the answer from 1 to 5 and give concise feedback.

Question: "${question}"
User Answer: "${userAns}"

Return ONLY valid JSON in this format:
{
  "rating": 3,
  "feedback": "Your feedback here in 3 to 5 lines."
}
`;

        const ChatSession = await chatSessionPromise;
        const result = await ChatSession.sendMessage(feedbackprompt);

        const mockJsonResp = result.response
            .text()
            .replace("```json", "")
            .replace("```", "");
        const jsonFeedbackResp = JSON.parse(mockJsonResp);

        const feedback = jsonFeedbackResp?.feedback || "";
        const rating = jsonFeedbackResp?.rating?.toString() || "";

        const resp = await fetch("/api/userAnswer", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                mockId,
                question,
                correctAns,
                userAns,
                feedback,
                rating,
                userEmail,
                createdAt: moment().format("DD-MM-YYYY"),
            }),
        });

        if (resp.ok) {

            toast("User response recorded successfully");
              setuseranswer('')
              setResults([])
          
        }
        setResults([])
        setloading(false);
    };


    return (
        <div className='flex items-center justify-center flex-col'>
            <div className='flex flex-col justify-center bg-secondary rounded-lg p-5 mt-20'>
                <Webcam
                    mirrored={true}
                    style={
                        {
                            height: 300,
                            width: "100%",
                            zIndex: 10
                        }
                    } />
            </div>
            <Button
                disabled={loading} variant="outline" className="my-10"
                onClick={StartStopRecording}
            >
                {isRecording ? <h2 className='text-red-700 flex gap-2'><Mic />Stop Recording.</h2> :
                    'Record Answer'}</Button>

        </div>
    )
}

export default RecordAnssection