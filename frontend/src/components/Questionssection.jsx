import { Lightbulb, Volume2 } from 'lucide-react';
import React from 'react';

function Questionssection({ Mockinterviewquestions, activequestionindex, setactivequestionindex }) {
  const textospeach = (text) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("sorry your browser do not support text to speech");
    }
  };

  if (!Mockinterviewquestions || !Mockinterviewquestions[activequestionindex]) {
    return <div>Loading questions...</div>;
  }

  return (
    <div className='p-6 border-2 border-gray-200 rounded-xl bg-white shadow-lg'>
      <h3 className='text-lg font-semibold mb-4 text-gray-800'>Interview Questions</h3>
      
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6'>
        {Mockinterviewquestions && Mockinterviewquestions.map((question, index) => (
          <button
            key={index}
            onClick={() => setactivequestionindex && setactivequestionindex(index)}
            className={`p-3 rounded-lg text-xs md:text-sm text-center cursor-pointer transition-all font-medium
      ${activequestionindex === index 
        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105' 
        : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:scale-105'
      }`}
          >
            Q{index + 1}
          </button>
        ))}
      </div>
      
      <div className='space-y-4'>
        <div className='p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200'>
          <h2 className='text-base md:text-lg font-medium text-gray-800 mb-3'>
            {Mockinterviewquestions[activequestionindex]?.question}
          </h2>
          <button
            onClick={() => textospeach(Mockinterviewquestions[activequestionindex]?.question)}
            className='flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium'
          >
            <Volume2 size={18} />
            Listen to question
          </button>
        </div>
      </div>

      <div className='border-2 border-yellow-300 rounded-lg p-5 bg-gradient-to-r from-yellow-50 to-amber-50 mt-6 shadow-sm'>
        <h2 className='flex gap-2 items-center text-yellow-800 font-semibold mb-2'>
          <Lightbulb size={20} />
          <strong>Tip</strong>
        </h2>
        <p className='text-sm text-yellow-900'>{import.meta.env.VITE_INFO || "Please answer the questions clearly and concisely."}</p>
      </div>
    </div>
  );
}

export default Questionssection;
