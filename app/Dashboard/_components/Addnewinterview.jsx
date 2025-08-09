"use client"


import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { chatSession } from "@/utils/GeminiAIModel";
import { chatSessionPromise } from "@/utils/GeminiAIModel";

import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { useRouter } from 'next/navigation';



function Addnewinterview() {
    const [openDialog, setOpenDialog] = useState(false);
    const [jobPosition, setJobPosition] = useState('');
    const [jobDesc, setJobDesc] = useState('');
    const [jobExperience, setJobExperience] = useState('');
    const [loading, setLoading] = useState(false);
    const [jsonResponse, setjsonResponse] = useState([]);
    const [promptOutput, setPromptOutput] = useState(null);
    const [InterviewData, setInterviewData] = useState("") // Optional
    const router = useRouter();
    const { user } = useUser();

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        console.log(jobPosition, jobDesc, jobExperience);

        const InputPrompt = `Job position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}. Based on this information, please give me 5 interview questions with answers in JSON format. Each JSON object should include "question" and "answer" fields.`;

        try {
            // Send the message to Gemini chat session
            const chatSession = await chatSessionPromise;
            const result = await chatSession.sendMessage(InputPrompt);
            const response = await result.response;
            const text = await response.text();
            const MockjsonResp = text.replace('```json', '').replace('```', '')
            console.log(JSON.parse(MockjsonResp)); // Will print the JSON string of Q&A
            setjsonResponse(MockjsonResp)
            if (MockjsonResp) {
                try {
                    const resp = await fetch("/api/interview", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            jsonMockresp: MockjsonResp, // lowercase "r"
                            jobPosition,
                            jobDesc,
                            jobExperience,
                            createdBy: user?.primaryEmailAddress?.emailAddress || "",
                            createdAt: moment().format("DD-MM-YYYY"),
                        }),
                    });

                    const data = await resp.json();

                    if (data.success) {
                        setInterviewData(data);
                        console.log("API Response:", data.data._id); // store the response from backend
                    router.push(`/dashboard/interviews/${data.data._id}`)
                    } else {
                        console.error("Error creating interview:", data.error);
                    }
                } catch (err) {
                    console.error("Fetch error:", err);
                }
            }

            setLoading(false)
        } catch (error) {
            console.error("Error in AI generation:", error);
        }
    };


    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
                <div
                    className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
                    onClick={() => setOpenDialog(true)}
                >
                    <h2 className="text-lg text-center">+ Add New Interview</h2>
                </div>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl">Tell us about your job interview</DialogTitle>
                    <DialogDescription>
                        Provide job details to generate interview questions.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmit} className="mt-4">
                    <div className="space-y-4">
                        <div>
                            <label className="font-medium">Job Position</label>
                            <Input
                                placeholder="Ex. Frontend Developer"
                                required
                                value={jobPosition}
                                onChange={(e) => setJobPosition(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="font-medium">Job Description</label>
                            <Textarea
                                placeholder="Ex. React, Next.js, TypeScript, etc."
                                required
                                value={jobDesc}
                                onChange={(e) => setJobDesc(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="font-medium">Years of Experience</label>
                            <Input
                                type="number"
                                required
                                placeholder="Ex. 5"
                                value={jobExperience}
                                onChange={(e) => setJobExperience(e.target.value)}
                                min="0"
                            />
                        </div>
                        <div className="flex gap-5 justify-end">
                            <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
                            <Button type="submit" disabled={loading}>
                                {loading ? (
                                    <>
                                        <Loader2 className="animate-spin mr-2" />
                                        Generating que's from AI...
                                    </>
                                ) : "Generate"}
                            </Button>
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default Addnewinterview;
