"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Webcam from "react-webcam";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Link from "next/link";

function Interview() {
  const [interviewID, setInterviewID] = useState(null);
  const [interviewdata, setinterviewdata] = useState(null);
  const [webcamenable, setwebcamenable] = useState(false);

   useEffect(() => {
  // Get the ID from the URL path
  const path = window.location.pathname;
  const id = path.split("/").pop();
  setInterviewID(id);

  if (id) {
    // Fetch data from your API route
    fetch(`/api/interview/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch interview data");
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setinterviewdata(data.data);
        } else {
          console.error("API error:", data.error);
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
      });
  }
}, []);


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
        <Link href={`/dashboard/interviews/${interviewID}/start`}>
          <Button>Start Interview</Button>
        </Link>

      </div>
    </div>
  );
}

export default Interview;
