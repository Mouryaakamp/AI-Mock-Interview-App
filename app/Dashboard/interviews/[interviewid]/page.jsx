"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Webcam from "react-webcam";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Link from "next/link";

function Interview() {
  const { interviewID } = useParams(); // comes from /dashboard/interview/[interviewID]
  const [interviewdata, setinterviewdata] = useState(null);
  const [webcamenable, setwebcamenable] = useState(false);

  useEffect(() => {
    if (interviewID) {
      fetch(`/api/interview/${interviewID}`) // ✅ match [id] API route
        .then((res) => res.json())
        .then((data) => {
          console.log("Fetched data:", data);
          setinterviewdata(data.data);
        })
        .catch(console.error);
    }
  }, [interviewID]);

  return (
    <div className="my-6">
      <h2 className="font-bold text-2xl">Lets get started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          {webcamenable ? (
            <Webcam
              onUserMedia={() => setwebcamenable(true)}
              onUserMediaError={() => setwebcamenable(false)}
              mirrored={true}
              style={{ height: 300, width: 300 }}
            />
          ) : (
            <>
              <WebcamIcon className="h-72 w-full my-7 p-20 bg-secondary rounded-lg border" />
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => setwebcamenable(true)}
              >
                Enable webcam and microphone
              </Button>
            </>
          )}
        </div>

        <div className="flex flex-col my-5 gap-5 p-5 rounded-lg border">
          <div className="flex flex-col p-5 rounded-lg border gap-5">
            <h2>
              <strong>Job role/Job position:</strong>{" "}
              {interviewdata?.jobPosition ?? "Loading..."}
            </h2>
            <h2>
              <strong>Job description/Techstack:</strong>{" "}
              {interviewdata?.jobDesc ?? "Loading..."}
            </h2>
            <h2>
              <strong>Years of experience:</strong>{" "}
              {interviewdata?.jobExperience ?? "Loading..."}
            </h2>
          </div>

          <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
            <h2 className="flex gap-2 items-center text-yellow-800">
              <Lightbulb />
              <strong>Information</strong>
            </h2>
            <h2 className="mt-3">{process.env.NEXT_PUBLIC_INFO}</h2>
          </div>
        </div>

        <Link href={`/dashboard/interview/${interviewdata?._id}/start`}>
          <Button>Start Interview</Button>
        </Link>
      </div>
    </div>
  );
}

export default Interview;
