import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import InterviewItemCard from './InterviewItemCard';
import { AuthContext } from "../context/Usecontext";
import { API } from "../utils/Api";
import { Button } from "@/components/ui/button";

export default function InterviewList() {
  const { accessToken } = useContext(AuthContext);
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [unauthorized, setUnauthorized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = accessToken || localStorage.getItem("token");
    if (!token) return;

    setUnauthorized(false);
    const fetchInterviews = async () => {
      setLoading(true);
      try {
        const email = localStorage.getItem("userEmail");
        if (!email) {
          setUnauthorized(true);
          return;
        }

        const res = await API({
          method: "GET",
          url: "/interviews",
          
        });

        setInterviews(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Interviews fetch error:", err);
        if (err.response?.status === 401) {
          setUnauthorized(true);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchInterviews();
  }, [accessToken]);


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

  if (unauthorized) {
    return (
      <div className="text-center py-12 bg-amber-50 border-2 border-amber-200 rounded-lg">
        <p className="text-amber-800 font-medium mb-2">Session expired or invalid</p>
        <p className="text-amber-700 text-sm mb-4">Please log in again to view your interviews.</p>
        <Button type="button"
          onClick={(e) => { e.preventDefault(); navigate("/login"); }}
          className="bg-amber-600 hover:bg-amber-700 text-white"
        >
          Go to Login
        </Button>
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
            key={interview._id}

          />
        ))}
      </div>
    </div>
  );
}
