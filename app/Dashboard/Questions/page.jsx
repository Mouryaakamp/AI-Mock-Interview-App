"use client";
import QuestionCard from "./QuestionCard";

export default function QuestionsPage() {
  const categories = [
    { title: "Interview Questions", questions: [
      "Tell me about yourself", "Why should we hire you?", "What are your strengths?",
      "Describe a challenge you faced", "Where do you see yourself in 5 years?",
    ]},
    { title: "Java Questions", questions: [
      "What is JVM?", "Explain OOP concepts", "Difference between HashMap and Hashtable",
      "What is garbage collection?", "What is multithreading?",
    ]},
    { title: "JavaScript Questions", questions: [
      "What is closure?", "Explain event loop", "Difference between var, let, const",
      "What is hoisting?", "What is async/await?",
    ]},
    { title: "React Questions", questions: [
      "What is JSX?", "Explain props vs state", "What is useEffect?",
      "What are keys in React?", "Explain context API",
    ]},
    { title: "Database Questions", questions: [
      "What is normalization?", "Explain ACID properties", "Difference between SQL and NoSQL",
      "What is indexing?", "What is a foreign key?",
    ]},
    { title: "System Design Questions", questions: [
      "Design a URL shortener", "Design a chat app", "Explain load balancing",
      "What is sharding?", "Explain CDN",
    ]},
  ];

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-12">
      {/* ↓ Smaller font size */}
      <h1 className="text-2xl font-bold mb-6 mt-10">Question Categories</h1>
      
      <div
        className="
          grid 
          gap-6 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3
        "
      >
        {categories.map((cat, idx) => (
          <QuestionCard
            key={idx}
            title={cat.title}
            questions={cat.questions.map((q, i) => `${i + 1}. ${q}`)} // ← Numbering added
          />
        ))}
      </div>
    </div>
  );
}
