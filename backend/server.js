import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
 

import express from "express";
import cors from "cors";
import connectionTodb from "./utils/db.js";

import interviewRoutes from "./routes/interview.js";
import interviewsRoutes from "./routes/interviews.js";
import userAnswerRoutes from "./routes/userAnswer.js";
import feedbackRoutes from "./routes/feedback.js";
import geminiRoutes from "./routes/gemini.js";

console.log("ENV MONGO_URI =", process.env.MONGO_URI);
console.log("ENV GEMINI_API_KEY =", process.env.GEMINI_API_KEY ? "SET" : "NOT SET - Please configure in .env file");


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database
connectionTodb().then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Routes
app.use('/api/interview', interviewRoutes);
app.use('/api/interviews', interviewsRoutes);
app.use('/api/userAnswer', userAnswerRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/gemini', geminiRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
