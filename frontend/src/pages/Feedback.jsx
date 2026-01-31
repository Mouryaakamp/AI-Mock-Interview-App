import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDownIcon } from "lucide-react";
import { Button } from '@/components/ui/button';
import { API } from '@/utils/Api';

export default function FeedbackPage() {
  const { interviewid } = useParams();
  const [feedbackList, setfeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [overallRating, setOverallRating] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!interviewid) return;

    setLoading(true);
    API({ method: 'GET', url: `/feedback/${interviewid}` })
      .then(res => {
        const data = res.data;
        setfeedbackList(data ?? []);

        if (data && data.length > 0) {
          const ratings = data
            .map(item => parseFloat(item.rating))
            .filter(rating => !isNaN(rating));

          if (ratings.length > 0) {
            const average = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
            setOverallRating(Math.round(average * 10) / 10);
          }
        }
      })
      .catch(err => {
        console.error('Error fetching feedback:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [interviewid]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600">Loading feedback...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='p-6 md:p-10 space-y-6'>
      <div className='bg-gradient-to-r from-green-500 to-emerald-600 text-white p-8 rounded-xl shadow-lg'>
        <h2 className='text-4xl font-bold mb-2'>Congratulations! 🎉</h2>
        <h2 className='text-xl font-semibold mb-4'>Here is your interview feedback</h2>
        <div className='flex items-center gap-4'>
          <div className='bg-white/20 backdrop-blur-sm rounded-lg p-4'>
            <p className='text-sm text-green-100 mb-1'>Overall Rating</p>
            <p className='text-4xl font-bold'>{overallRating.toFixed(1)}<span className='text-2xl'>/5</span></p>
          </div>
          <div className='flex-1'>
            <div className='h-3 bg-white/20 rounded-full overflow-hidden'>
              <div
                className='h-full bg-white rounded-full transition-all duration-500'
                style={{ width: `${(overallRating / 5) * 100}%` }}
              ></div>
            </div>
            <p className='text-sm text-green-100 mt-2'>
              {overallRating >= 4 ? 'Excellent performance!' :
                overallRating >= 3 ? 'Good job! Keep practicing.' :
                  'Keep working on your answers. You can improve!'}
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className='text-xl font-semibold text-gray-800 mb-4'>
          Detailed Feedback
        </h3>
        <p className='text-sm text-gray-600 mb-6'>
          Review each question, your answers, and feedback for improvement
        </p>

        <div className='space-y-4'>
          {feedbackList && feedbackList.length > 0 ? (
            feedbackList.map((item, index) => (
              <Collapsible key={index} className='border-2 border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow'>
                <CollapsibleTrigger className='p-4 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 rounded-lg flex justify-between items-center text-left gap-4 w-full transition-all'>
                  <div className='flex-1'>
                    <div className='flex items-center gap-3 mb-1'>
                      <span className='bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold'>
                        {index + 1}
                      </span>
                      <span className='font-medium text-gray-800'>{item.question}</span>
                    </div>
                  </div>
                  <ChevronDownIcon className="h-5 w-5 text-gray-600 flex-shrink-0" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-4 space-y-3 bg-white">
                    <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <span className="font-semibold text-blue-900">Rating:</span>
                      <span className="text-blue-700 font-bold text-lg">{item.rating}/5</span>
                      <div className='flex-1 h-2 bg-blue-200 rounded-full ml-2'>
                        <div
                          className='h-full bg-blue-600 rounded-full'
                          style={{ width: `${(parseFloat(item.rating) / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="p-3 border-2 border-red-200 rounded-lg bg-red-50">
                      <h4 className="font-semibold text-red-900 mb-1">Your Answer:</h4>
                      <p className="text-sm text-red-800">{item.userAns || 'No answer provided'}</p>
                    </div>

                    {item.correctAns && (
                      <div className="p-3 border-2 border-green-200 rounded-lg bg-green-50">
                        <h4 className="font-semibold text-green-900 mb-1">Expected Answer:</h4>
                        <p className="text-sm text-green-800">{item.correctAns}</p>
                      </div>
                    )}

                    <div className="p-3 border-2 border-blue-200 rounded-lg bg-blue-50">
                      <h4 className="font-semibold text-blue-900 mb-1">Feedback:</h4>
                      <p className="text-sm text-blue-800">{item.feedback || 'No feedback available'}</p>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))
          ) : (
            <div className='text-center p-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300'>
              <p className='text-gray-600'>No feedback available yet. Complete an interview to see feedback here.</p>
            </div>
          )}
        </div>
      </div>

      <div className='flex justify-center pt-6'>
        <Button type="button"
          onClick={(e) => { e.preventDefault(); navigate('/dashboard'); }}
          className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 min-w-[200px] h-12'
        >
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
}
