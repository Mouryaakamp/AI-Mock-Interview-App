"use client"
import { GoogleGenerativeAI } from "@google/generative-ai";

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

function Addnewinterview() {
    const [openDialog, setOpenDialog] = useState(false);
    const [jobPosition, setJobPosition] = useState('');
    const [jobDesc, setJobDesc] = useState('');
    const [jobExperience, setJobExperience] = useState('');
    const [loading, setLoading] = useState(false);
    const [promptOutput, setPromptOutput] = useState(null); // Optional

  const onSubmit = async (e) => {
  e.preventDefault();
  try {
    setLoading(true);

    const InputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDesc}, Year of experience: ${jobExperience}. Based on this information, give me ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions — ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_EASY} easy, ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_MEDIUM} medium, and ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_HARD} hard — with answers in JSON format. Use "question" and "answer" as keys.`;

    const answer = await AIResponse(InputPrompt);

    // Clean ```json or ``` from Gemini response
    const exactAnswer = answer.replace(/```json\s*|```/g, "").trim();
    console.log(exactAnswer);

    setLoading(false);
  } catch (err) {
    console.error("Error generating AI response:", err);
    setLoading(false);
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
                                        Generating...
                                    </>
                                ) : "Generate Interview"}
                            </Button>
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default Addnewinterview;
