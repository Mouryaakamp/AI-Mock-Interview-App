"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import InterviewItemCard from './InterviewItemCard';

export default function InterviewList() {
  const { user } = useUser();
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchedRef = useRef(false);

useEffect(() => {
    const email = user?.primaryEmailAddress?.emailAddress || "example@gmail.com";
    
    if (fetchedRef.current) return; // Prevent double fetch
    fetchedRef.current = true;

    const fetchInterviews = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/interviews', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ createdBy: email }),
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
  }, [user]);

  if (loading) return <p>Loading interviews...</p>;
  if (interviews.length === 0) return <p>No interviews found.</p>;

  return (
     <div>
        <h2 className='font-medium text-xl'>Previous Mock Interview</h2>
        <div className='grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3'>
            {interviews&&interviews.map((interview,index)=>(
            <InterviewItemCard 
            interview={interview}
            key={index}/>
        ))}</div>
        
        </div>
  );
}
