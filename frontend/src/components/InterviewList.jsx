import React, { useEffect, useRef, useState } from 'react';
import InterviewItemCard from './InterviewItemCard';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function InterviewList() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchedRef = useRef(false);

  useEffect(() => {
    const getUserEmail = () => {
      return localStorage.getItem('userEmail') || "example@gmail.com";
    };

    if (fetchedRef.current) return;
    fetchedRef.current = true;

    const fetchInterviews = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/api/interviews`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ createdBy: getUserEmail() }),
        });
        if (!res.ok) throw new Error('Failed to fetch interviews');
        const data = await res.json();
        console.log('Fetched interviews:', data);
        setInterviews(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchInterviews();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600">Loading interviews...</p>
        </div>
      </div>
    );
  }
  
  if (interviews.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <p className="text-gray-600 text-lg mb-2">No interviews found.</p>
        <p className="text-gray-500 text-sm">Create your first interview to get started!</p>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h2 className='font-bold text-2xl text-gray-800'>Your Interviews</h2>
        <span className='text-sm text-gray-500'>{interviews.length} {interviews.length === 1 ? 'interview' : 'interviews'}</span>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {interviews && interviews.map((interview, index) => (
          <InterviewItemCard
            interview={interview}
            key={interview._id || index}
          />
        ))}
      </div>
    </div>
  );
}
