import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Webcam from "react-webcam";
import { Lightbulb, WebcamIcon } from "lucide-react";
import { API } from "@/utils/Api";

function Interview() {
  const { interviewid } = useParams();
  const [interviewdata, setinterviewdata] = useState(null);
  const [webcamenable, setwebcamenable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (interviewid) {
      setLoading(true);
      setError(null);
      API({ method: 'GET', url: `/interview/${interviewid}` })
        .then((res) => {
          const data = res.data;
          if (data.success) {
            setinterviewdata(data.data);
          } else {
            setError(data.error || "Failed to load interview data");
          }
        })
        .catch((err) => {
          console.error("Fetch error:", err);
          setError(err.response?.data?.error || err.message || "Failed to load interview");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setError("Interview ID not found");
      setLoading(false);
    }
  }, [interviewid]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600">Loading interview details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4 p-6 bg-red-50 border border-red-200 rounded-lg max-w-md">
          <p className="text-red-700 font-medium">Error loading interview</p>
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-8 space-y-8">
      <div className='bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-xl shadow-lg'>
        <h1 className="text-3xl font-bold mb-2">Let's Get Started</h1>
        <p className="text-blue-100">Review your interview details and prepare your setup</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className='space-y-4'>
          <h3 className='font-semibold text-gray-700'>Camera Preview</h3>
          {webcamenable ? (
            <div className='border-2 border-gray-200 rounded-xl overflow-hidden shadow-lg'>
              <Webcam
                onUserMedia={() => setwebcamenable(true)}
                onUserMediaError={() => {
                  setwebcamenable(false);
                  alert('Failed to access webcam. Please check permissions.');
                }}
                mirrored={true}
                style={{ height: 400, width: '100%', objectFit: 'cover' }}
              />
            </div>
          ) : (
            <div className='space-y-4'>
              <div className='h-96 w-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center'>
                <WebcamIcon className="h-24 w-24 text-gray-400 mb-4" />
                <p className='text-gray-600 font-medium mb-2'>Camera not enabled</p>
                <p className='text-sm text-gray-500 text-center px-4'>
                  Enable your webcam to record your interview session
                </p>
              </div>
              <Button type="button"
                variant="outline"
                className="w-full h-12 text-base"
                onClick={(e) => { e.preventDefault(); setwebcamenable(true); }}
              >
                Enable Webcam and Microphone
              </Button>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col p-6 rounded-xl border-2 border-gray-200 bg-white shadow-sm space-y-4">
            <h3 className='font-semibold text-lg text-gray-800 mb-2'>Interview Details</h3>
            <div className='space-y-3'>
              <div>
                <p className='text-sm font-medium text-gray-600 mb-1'>Job Position</p>
                <p className='text-base text-gray-800'>{interviewdata?.jobPosition ?? "Loading..."}</p>
              </div>
              <div>
                <p className='text-sm font-medium text-gray-600 mb-1'>Job Description / Tech Stack</p>
                <p className='text-base text-gray-800'>{interviewdata?.jobDesc ?? "Loading..."}</p>
              </div>
              <div>
                <p className='text-sm font-medium text-gray-600 mb-1'>Years of Experience</p>
                <p className='text-base text-gray-800'>{interviewdata?.jobExperience ?? "Loading..."} years</p>
              </div>
            </div>
          </div>

          <div className="p-6 border-2 border-yellow-300 rounded-xl bg-gradient-to-r from-yellow-50 to-amber-50 shadow-sm">
            <h2 className="flex gap-2 items-center text-yellow-800 font-semibold mb-3">
              <Lightbulb size={20} />
              <strong>Important Information</strong>
            </h2>
            <p className="text-sm text-yellow-900">
              {import.meta.env.VITE_INFO || "Please answer the questions clearly and concisely. Make sure your microphone and camera are working properly before starting."}
            </p>
          </div>
        </div>
      </div>

      <div className='flex justify-center pt-4'>
        <Link to={`/dashboard/interviews/${interviewid}/start`}>
          <Button className='min-w-[200px] h-12 text-base bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'>
            Start Interview
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Interview;
