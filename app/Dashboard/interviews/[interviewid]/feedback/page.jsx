"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDownIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from '@/components/ui/button'



export default function FeedbackPage() {
    const params = useParams();
    const interviewid = params?.interviewid;
    const [feedbackList, setfeedbackList] = useState([])
const router=useRouter()


    useEffect(() => {
        if (!interviewid) return; // wait until ID is available

        fetch(`/api/feedback/${interviewid}`)  // <-- changed here
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch feedback');
                return res.json();

            })

            .then(data => {
                console.log(data);
                setfeedbackList(data);
            })
            .catch(console.error);

    }, [interviewid]);

    return (
        <div className='p-10'>
            <h2 className='text-3xl font-bold text-green-500'>Congratulation!</h2>
            <h2 className='font-bold text-2xl'>Here is your interview feedback</h2>
            <h2 className='text-primary text-lg my-3'>Your overall interview rating:<strong> /10</strong></h2>
            <h2 className='text-sm text-gray-500'>Find below interview question with your answer and feedback for improvement</h2>
{feedbackList&&feedbackList.map((item,index)=>(
<Collapsible key={index} className='mt-7'>
  <CollapsibleTrigger className='p-2 bg-secondary rounded-lg my-2 flex justify-between text-left gap-7 w-full'>{item.question} <ChevronDownIcon className="h-5 w-5"/></CollapsibleTrigger>
  <CollapsibleContent>
     <div className="flex flex-col gap-2">
        <h2 className="text-red-500 p-2 border rounded-lg"><strong>Rating:</strong>{item.rating}</h2>
    <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900"> <strong>Your answer: </strong>{item.userAns}</h2>
    <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900"> <strong>Correct answer: </strong>{item.correctAns}</h2>
       <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-blue-900"> <strong>Feedback: </strong>{item.feedback}</h2>

   
    </div>
  </CollapsibleContent>
</Collapsible>
))}

<Button onClick={()=>router.replace('/dashboard')}>Go home</Button>

        </div>
    )
}

