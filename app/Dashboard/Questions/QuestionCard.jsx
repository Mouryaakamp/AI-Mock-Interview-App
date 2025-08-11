"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function QuestionCard({ title, questions }) {
  const [showQuestions, setShowQuestions] = useState(false);

  return (
    <div className="border p-4 rounded-lg shadow-md bg-white hover:shadow-lg transition">
      <h2 className="text-md font-bold mb-3">{title}</h2>

      {showQuestions ? (
        <ul className="space-y-2">
          {questions.map((q, i) => (
            <li key={i} className="text-sm text-gray-700">
              {q}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Click below to view questions</p>
      )}

      <Button
        onClick={() => setShowQuestions(!showQuestions)}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {showQuestions ? "Hide Questions" : "Show Questions"}
      </Button>
    </div>
  );
}
