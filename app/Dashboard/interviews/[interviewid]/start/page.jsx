"use client";

import { useEffect, useState } from "react";
import Questionssection from "./_components/Questionssection";
import RecordAnssection from "./_components/RecordAnssection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";

function StartInterview() {
  const [interviewID, setInterviewID] = useState(null);
  const [interviewData, setInterviewData] = useState(null);
  const [Mockinterviewquestions, setMockinterviewQuestions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const[activequestionindex,setactivequestionindex]=useState(0)
const params = useParams();
  const interviewId = params.interviewid;





  useEffect(() => {
    const path = window.location.pathname;
    // Assuming your URL is like /dashboard/interviews/[id]/start
    // So ID is the segment before last (start)
    const segments = path.split("/").filter(Boolean);
    const id = segments[segments.length - 2]; // get the second last segment as ID
    setInterviewID(id);

    if (id) {
      fetch(`/api/interview/${id}`)
  .then((res) => {
    if (!res.ok) throw new Error("Failed to fetch interview data");
    return res.json();
  })
  .then((data) => {
    if (data.success) {
      setInterviewData(data.data);
      try {
        const parsedQuestions = JSON.parse(data.data.jsonMockResp); // small 'r'
        setMockinterviewQuestions(parsedQuestions);
      } catch (err) {
        console.error("JSON parse error:", err);
        setMockinterviewQuestions(null);
      }
    } else {
      setError(data.error);
    }
  })
  .catch((err) => setError(err.message))
  .finally(() => setLoading(false));
    } else {
      setError("Interview ID not found in URL");
      setLoading(false);
    }
  }, []);

  if (loading) return <p>Loading interview...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
{/* question */}
<Questionssection Mockinterviewquestions={Mockinterviewquestions}
activequestionindex={activequestionindex}/>
{/* video/audio record */}
<RecordAnssection Mockinterviewquestions={Mockinterviewquestions}
activequestionindex={activequestionindex} interviewData={interviewData}/>
      </div>
      <div className="flex justify-end gap-6">
        {activequestionindex>0&&<Button onClick={()=>setactivequestionindex(activequestionindex-1)}>Previous Question</Button>}

        {activequestionindex!=Mockinterviewquestions?.length-1&&<Button onClick={()=>setactivequestionindex(activequestionindex+1)}>Next Question</Button>}

        
        {activequestionindex == Mockinterviewquestions?.length - 1 && 
        <Link href={`/dashboard/interviews/${interviewId}/feedback`}>
          <Button>End Interview</Button>
        </Link>}
      </div>
    </div>
  );
}

export default StartInterview;
