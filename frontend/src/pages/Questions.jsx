import { Lightbulb, BookOpen, HelpCircle } from 'lucide-react';

export default function Questions() {
  const faqData = [
    {
      question: "How are interview questions generated?",
      answer: "Our AI uses advanced machine learning models to generate personalized interview questions based on your job position, description, and experience level."
    },
    {
      question: "Can I customize the number of questions?",
      answer: "Currently, each interview session includes 5 carefully crafted questions. We're working on adding customization options in future updates."
    },
    {
      question: "What types of questions are asked?",
      answer: "Questions cover technical skills, problem-solving abilities, behavioral scenarios, and role-specific knowledge relevant to your target position."
    },
    {
      question: "How accurate is the AI feedback?",
      answer: "Our AI provides comprehensive feedback based on industry standards and best practices. However, it's recommended to also seek feedback from human mentors."
    }
  ];

  return (
    <div className="p-6 md:p-10 space-y-8">
      <div className='bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-xl shadow-lg'>
        <div className='flex items-center gap-3 mb-4'>
          <BookOpen size={32} />
          <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
        </div>
        <p className="text-blue-100 text-lg">Everything you need to know about our interview questions</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {faqData.map((faq, index) => (
          <div key={index} className='p-6 border-2 border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow'>
            <div className='flex items-start gap-3 mb-3'>
              <HelpCircle className='text-blue-600 flex-shrink-0 mt-1' size={24} />
              <h3 className='font-semibold text-lg text-gray-800'>{faq.question}</h3>
            </div>
            <p className='text-gray-600 ml-9'>{faq.answer}</p>
          </div>
        ))}
      </div>

      <div className='bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-8'>
        <div className='flex items-start gap-4'>
          <Lightbulb className='text-yellow-600 flex-shrink-0 mt-1' size={28} />
          <div>
            <h3 className='font-bold text-xl text-gray-800 mb-2'>Tips for Better Answers</h3>
            <ul className='space-y-2 text-gray-700'>
              <li className='flex items-start gap-2'>
                <span className='text-blue-600 font-bold'>•</span>
                <span>Be specific and provide examples from your experience</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-blue-600 font-bold'>•</span>
                <span>Structure your answers using the STAR method (Situation, Task, Action, Result)</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-blue-600 font-bold'>•</span>
                <span>Speak clearly and at a moderate pace</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-blue-600 font-bold'>•</span>
                <span>Take a moment to think before answering</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
