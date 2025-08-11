import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

function InterviewItemCard({ interview }) {
const router=useRouter();
const onStart=()=>{
router.push('/dashboard/interviews/'+interview._id)
}
const onFeedback=()=>{
router.push(`/dashboard/interviews/${interview._id}/feedback`);}

    return (
        <div className='border shadow-sm rounded-lg p-3 '>
            <h2 className='font-bold text-blue-600'>{interview?.jobPosition}</h2>
            <h2 className='text-sm text-gray-500'>{interview?.jobExperience} Years of experience:</h2>
            <h2 className='text-xs text-gray-400'>Created at:{interview?.createdAt}</h2>
        
        <div className='flex justify-between mt-2 gap-5'>
            <Button size="sm" variant="outline"
            onClick={onFeedback}>Feedback</Button>
            <Button size="sm" 
            onClick={onStart}>Start</Button>
        </div>
        </div>
    )
}

export default InterviewItemCard