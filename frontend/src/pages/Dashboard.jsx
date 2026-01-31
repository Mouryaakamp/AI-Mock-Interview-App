import React from 'react';
import Addnewinterview from '../components/Addnewinterview';
import InterviewList from '../components/InterviewList';

function Dashboard() {
  return (
    <div className='p-6 md:p-10 space-y-8'>
      <div className='space-y-2'>
        <h1 className='text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
          Dashboard
        </h1>
        <p className='text-gray-600 text-lg'>Create and start your AI mock interview</p>
      </div>
      
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 my-8'>
        <Addnewinterview />
      </div>
      <InterviewList />
    </div>
  );
}

export default Dashboard;
