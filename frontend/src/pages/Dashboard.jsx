
import Addnewinterview from '../components/Addnewinterview';
import InterviewList from '../components/InterviewList';
import { useEffect, useState } from "react";
import { API } from "../utils/Api";


function Dashboard() {
  const [overallRating, setOverallRating] = useState(null);
  const [loading, setLoading] = useState(false);
  const userEmail = localStorage.getItem("userEmail");


  useEffect(() => {
    if (!userEmail) {
      setOverallRating(null);
      return;
    }

    setLoading(true);
    API({
      method: "GET",
      url: "/feedback/by-user",
      params: { userEmail },
    })
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : [];

        if (data.length === 0) {
          setOverallRating(null);
          return;
        }

        const ratings = data
          .map(item => Number(item.rating))
          .filter(r => !isNaN(r));

        if (ratings.length > 0) {
          setOverallRating(
            Math.round(
              (ratings.reduce((a, b) => a + b, 0) / ratings.length) * 10
            ) / 10
          );
        } else {
          setOverallRating(null);
        }
      })
      .catch(err => {
        console.error("Dashboard feedback fetch error:", err);
        setOverallRating(null);
      })
      .finally(() => setLoading(false));
  }, [userEmail]);


  const scoreColor =
    overallRating >= 4 ? "text-green-600" :
      overallRating >= 3 ? "text-yellow-500" :
        "text-red-500";

  return (
    <div className="p-6 md:p-10 space-y-8">

      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-gray-600 text-lg">
          Create and start your AI mock interview
        </p>
      </div>

      {/* Top Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">

        {/* Column 1 — Add Interview */}
        <Addnewinterview />

        {/* Column 2 — Latest Interview Score */}
        <div className="bg-white border border-gray-400 rounded-xl p-6 flex flex-col items-center justify-center text-center">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Latest Interview Score
          </h3>

          {overallRating !== null ? (
            <>
              <p className={`text-5xl font-bold ${scoreColor}`}>
                {overallRating}
              </p>
              <p className="text-sm text-gray-500 mt-1">out of 5</p>
            </>
          ) : (
            <p className="text-gray-500 text-sm">
              Complete your first interview to see your score
            </p>
          )}

        </div>

        {/* Column 3 — Learning Resources */}
        <div className="bg-white border border-gray-400 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900">
              Learning Resources
            </h3>
          </div>

          <p className="text-sm text-gray-600">
            Prepare better with these helpful resources
          </p>

          <div className="space-y-3">
            <a
              href="https://www.geeksforgeeks.org/interview-preparation/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-green-400 hover:shadow-sm transition-all duration-200"
            >
              <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 font-bold text-sm">G</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 text-sm group-hover:text-green-600 transition-colors">GeeksforGeeks</p>
                <p className="text-xs text-gray-500">Interview Prep</p>
              </div>
              <svg className="w-4 h-4 text-gray-400 group-hover:text-green-600 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>

            <a
              href="https://leetcode.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-orange-400 hover:shadow-sm transition-all duration-200"
            >
              <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-orange-600 font-bold text-sm">LC</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 text-sm group-hover:text-orange-600 transition-colors">LeetCode</p>
                <p className="text-xs text-gray-500">Coding Practice</p>
              </div>
              <svg className="w-4 h-4 text-gray-400 group-hover:text-orange-600 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>

            <a
              href="https://www.w3schools.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-sm transition-all duration-200"
            >
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-bold text-sm">W3</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors">W3Schools</p>
                <p className="text-xs text-gray-500">Web Tutorials</p>
              </div>
              <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

      </div>

      {/* Interview List — unchanged */}
      <InterviewList />

    </div>

  );
}

export default Dashboard;