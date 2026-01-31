import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import React from 'react';

function InterviewItemCard({ interview }) {
  const navigate = useNavigate();

  const onStart = (e) => {
    if (e) e.preventDefault();
    navigate('/dashboard/interviews/' + interview._id);
  };

  const onFeedback = (e) => {
    if (e) e.preventDefault();
    navigate(`/dashboard/interviews/${interview._id}/feedback`);
  };

  return (
    <div className='border-2 border-gray-200 shadow-md hover:shadow-xl rounded-xl p-5 bg-white transition-all hover:scale-105 group'>
      <div className='space-y-3 mb-4'>
        <div className='flex items-start justify-between'>
          <h2 className='font-bold text-lg text-gray-800 group-hover:text-blue-600 transition-colors'>
            {interview?.jobPosition || 'Untitled Interview'}
          </h2>
          <div className='w-3 h-3 rounded-full bg-green-500'></div>
        </div>
        <p className='text-sm text-gray-600'>
          <span className='font-medium'>{interview?.jobExperience || 'N/A'}</span> years of experience
        </p>
        <p className='text-xs text-gray-400'>
          Created: {interview?.createdAt || 'Unknown date'}
        </p>
        {interview?.jobDesc && (
          <p className='text-xs text-gray-500 line-clamp-2'>
            {interview.jobDesc.substring(0, 100)}...
          </p>
        )}
      </div>

      <div className='flex justify-between gap-3 pt-4 border-t border-gray-100'>
        <Button type="button"
          size="sm" 
          variant="outline" 
          onClick={onFeedback}
          className='flex-1 hover:bg-blue-50 hover:border-blue-300'
        >
          View Feedback
        </Button>
        <Button type="button"
          size="sm" 
          onClick={onStart}
          className='flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
        >
          Start Interview
        </Button>
      </div>
    </div>
  );
}

export default InterviewItemCard;
