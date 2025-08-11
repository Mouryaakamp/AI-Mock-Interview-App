"use client";

import { FaUser, FaBriefcase, FaRobot, FaCheckCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function HowItWorks() {
  const router = useRouter();

  const steps = [
    {
      icon: <FaUser className="text-blue-500 text-4xl" />,
      title: "Create Your Profile",
      desc: "Sign up and provide your details to personalize your experience.",
    },
    {
      icon: <FaBriefcase className="text-green-500 text-4xl" />,
      title: "Select Your Job Role",
      desc: "Choose the role and skill set you want to practice for.",
    },
    {
      icon: <FaRobot className="text-yellow-500 text-4xl" />,
      title: "AI Mock Interview",
      desc: "Get interview questions from AI tailored to your profile.",
    },
    {
      icon: <FaCheckCircle className="text-purple-500 text-4xl" />,
      title: "Get Feedback",
      desc: "Receive instant feedback to improve your interview skills.",
    },
  ];

  return (
    <div className="">
      {/* Heading same as Choose Your Plan */}
      <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-5 mt-5">
        How it Works
      </h2>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-xl transition"
          >
            <div className="flex justify-center mb-4">{step.icon}</div>
            <h3 className="font-bold text-lg mb-2">{step.title}</h3>
            <p className="text-gray-600 text-sm">{step.desc}</p>
          </div>
        ))}
      </div>

      {/* Button */}
      <div className="mt-10 flex justify-center">
        <button
          onClick={() => router.push("/dashboard")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full shadow-md transition"
        >
          Start Practicing Now
        </button>
      </div>
    </div>
  );
}
