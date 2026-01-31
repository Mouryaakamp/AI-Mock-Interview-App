import { PlayCircle, Mic, FileText, TrendingUp, CheckCircle2 } from 'lucide-react';

export default function How() {
  const steps = [
    {
      icon: FileText,
      title: "Create Interview",
      description: "Enter your job position, description, and experience level. Our AI will generate personalized questions.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: PlayCircle,
      title: "Start Recording",
      description: "Enable your webcam and microphone, then start the interview session. Answer each question naturally.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Mic,
      title: "Record Answers",
      description: "Click the start recording speak your answers clearly after your done click stop recording to save your answer",
      color: "from-pink-500 to-pink-600"
    },
    {
      icon: TrendingUp,
      title: "Get Feedback",
      description: "Receive detailed AI-powered feedback on your answers, including ratings and improvement suggestions.",
      color: "from-green-500 to-green-600"
    }
  ];

  return (
    <div className="p-6 md:p-10 space-y-12">
      <div className='text-center space-y-4'>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          How It Works
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Practice your interview skills with AI-powered mock interviews. Get instant feedback and improve your performance.
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={index} className='relative'>
              <div className='bg-white border-2 border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all h-full'>
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${step.color} flex items-center justify-center mb-4 shadow-md`}>
                  <Icon className='text-white' size={32} />
                </div>
                <div className='absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center font-bold text-sm'>
                  {index + 1}
                </div>
                <h3 className='font-bold text-xl text-gray-800 mb-2'>{step.title}</h3>
                <p className='text-gray-600 text-sm'>{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className='hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10'>
                  <div className='w-6 h-0.5 bg-gray-300'></div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className='bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-xl shadow-lg'>
        <h2 className='text-2xl font-bold mb-6'>Key Features</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {[
            "AI-Generated Questions",
            "Real-time Speech Recognition",
            "Instant Feedback & Ratings",
            "Video Recording Support",
            "Performance Analytics",
            "Personalized Recommendations"
          ].map((feature, index) => (
            <div key={index} className='flex items-center gap-3'>
              <CheckCircle2 size={20} className='text-green-300' />
              <span className='text-blue-100'>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <div className='bg-gray-50 border-2 border-gray-200 rounded-xl p-8'>
        <h3 className='font-bold text-2xl text-gray-800 mb-4'>Ready to Get Started?</h3>
        <p className='text-gray-600 mb-6'>
          Create your first mock interview and start practicing today. It only takes a few minutes to set up!
        </p>
        <a href="/dashboard">
          <button type="button" className='px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-md'>
            Go to Dashboard
          </button>
        </a>
      </div>
    </div>
  );
}
