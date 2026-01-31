import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Questionssection from "../components/Questionssection";
import RecordAnssection from "../components/RecordAnssection";
import { Button } from "@/components/ui/button";
import { API } from "@/utils/Api";

function StartInterview() {
  const { interviewid } = useParams();
  const [interviewData, setInterviewData] = useState(null);
  const [Mockinterviewquestions, setMockinterviewQuestions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activequestionindex, setactivequestionindex] = useState(0);

  useEffect(() => {
    if (interviewid) {
      API({ method: 'GET', url: `/interview/${interviewid}` })
        .then((res) => {
          const data = res.data;
          if (data.success) {
            setInterviewData(data.data);
            try {
              const parsedQuestions = JSON.parse(data.data.jsonMockResp);
              setMockinterviewQuestions(parsedQuestions);
            } catch (err) {
              console.error("JSON parse error:", err);
              setMockinterviewQuestions(null);
            }
          } else {
            setError(data.error);
          }
        })
        .catch((err) => setError(err.response?.data?.error || err.message))
        .finally(() => setLoading(false));
    } else {
      setError("Interview ID not found in URL");
      setLoading(false);
    }
  }, [interviewid]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600">Loading interview...</p>
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
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-2">Mock Interview Session</h1>
        <p className="text-blue-100">Question {activequestionindex + 1} of {Mockinterviewquestions?.length || 0}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Questionssection
          Mockinterviewquestions={Mockinterviewquestions}
          activequestionindex={activequestionindex}
          setactivequestionindex={setactivequestionindex}
        />
        <RecordAnssection
          Mockinterviewquestions={Mockinterviewquestions}
          activequestionindex={activequestionindex}
          interviewData={interviewData}
          interviewid={interviewid}
        />
      </div>
      
      <div className="flex justify-between items-center gap-4 pt-6 border-t">
        <div>
          {activequestionindex > 0 && (
            <Button 
              variant="outline"
              onClick={() => setactivequestionindex(activequestionindex - 1)}
              className="min-w-[140px]"
            >
              ← Previous
            </Button>
          )}
        </div>

        <div className="flex gap-4">
          {activequestionindex !== Mockinterviewquestions?.length - 1 && (
            <Button 
              onClick={() => setactivequestionindex(activequestionindex + 1)}
              className="min-w-[140px] bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Next →
            </Button>
          )}

          {activequestionindex === Mockinterviewquestions?.length - 1 && (
            <Link to={`/dashboard/interviews/${interviewid}/feedback`}>
              <Button className="min-w-[140px] bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                End Interview
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default StartInterview;
