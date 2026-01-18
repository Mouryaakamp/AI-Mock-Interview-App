import { Check, Zap, Crown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Upgrade() {
  const features = {
    free: [
      "5 interview questions per session",
      "Basic AI feedback",
      "Speech-to-text transcription",
      "Video recording"
    ],
    pro: [
      "Unlimited interview questions",
      "Advanced AI feedback with detailed analysis",
      "Priority speech-to-text processing",
      "HD video recording",
      "Export interview reports",
      "Performance analytics dashboard",
      "Custom question sets",
      "Email support"
    ]
  };

  return (
    <div className="p-6 md:p-10 space-y-12">
      <div className='text-center space-y-4'>
        <div className='flex items-center justify-center gap-2 mb-4'>
          <Crown className='text-yellow-500' size={40} />
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
            Upgrade to Pro
          </h1>
        </div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Unlock advanced features and take your interview preparation to the next level
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto'>
        {/* Free Plan */}
        <div className='bg-white border-2 border-gray-200 rounded-xl p-8 shadow-sm'>
          <div className='text-center mb-6'>
            <h3 className='text-2xl font-bold text-gray-800 mb-2'>Free Plan</h3>
            <div className='mb-4'>
              <span className='text-4xl font-bold text-gray-800'>$0</span>
              <span className='text-gray-600'>/month</span>
            </div>
          </div>
          <ul className='space-y-3 mb-8'>
            {features.free.map((feature, index) => (
              <li key={index} className='flex items-start gap-3'>
                <Check className='text-green-500 flex-shrink-0 mt-0.5' size={20} />
                <span className='text-gray-600'>{feature}</span>
              </li>
            ))}
          </ul>
          <Button className='w-full' variant="outline" disabled>
            Current Plan
          </Button>
        </div>

        {/* Pro Plan */}
        <div className='bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-400 rounded-xl p-8 shadow-lg relative overflow-hidden'>
          <div className='absolute top-4 right-4'>
            <Sparkles className='text-yellow-500' size={24} />
          </div>
          <div className='absolute -top-4 -right-4 bg-yellow-500 text-white px-6 py-1 transform rotate-12 text-sm font-bold'>
            POPULAR
          </div>
          
          <div className='text-center mb-6'>
            <div className='flex items-center justify-center gap-2 mb-2'>
              <Zap className='text-yellow-600' size={24} />
              <h3 className='text-2xl font-bold text-gray-800'>Pro Plan</h3>
            </div>
            <div className='mb-4'>
              <span className='text-4xl font-bold text-gray-800'>$9.99</span>
              <span className='text-gray-600'>/month</span>
            </div>
            <p className='text-sm text-gray-600'>Everything in Free, plus:</p>
          </div>
          <ul className='space-y-3 mb-8'>
            {features.pro.map((feature, index) => (
              <li key={index} className='flex items-start gap-3'>
                <Check className='text-green-600 flex-shrink-0 mt-0.5' size={20} />
                <span className='text-gray-700 font-medium'>{feature}</span>
              </li>
            ))}
          </ul>
          <Button className='w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white h-12 text-base font-semibold'>
            Upgrade Now
          </Button>
        </div>
      </div>

      <div className='bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-xl shadow-lg text-center'>
        <h3 className='text-2xl font-bold mb-4'>Not Sure Yet?</h3>
        <p className='text-blue-100 mb-6 max-w-2xl mx-auto'>
          Start with our free plan and upgrade anytime. All your interview data will be preserved when you upgrade.
        </p>
        <Button variant="outline" className='bg-white text-blue-600 hover:bg-gray-100'>
          Learn More
        </Button>
      </div>
    </div>
  );
}
