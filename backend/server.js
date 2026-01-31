require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser")

const connectionTodb = require("./utils/db");

const interviewRoutes = require("./routes/interview");
const interviewsRoutes = require("./routes/interviews");
const userAnswerRoutes = require("./routes/userAnswer");
const feedbackRoutes = require("./routes/feedback");
const geminiRoutes = require("./routes/gemini");
const login = require("./routes/login");
const signup = require("./routes/signup");
const refresh = require("./routes/refresh");
const logout = require("./routes/logout");
const userfeedback =require("./routes/userfeedback");
const protect = require('./middleware/auth.middleware')

console.log("ENV MONGO_URI =", process.env.MONGO_URI);
console.log("ENV GEMINI_API_KEY =", process.env.GEMINI_API_KEY ? "SET" : "NOT SET - Please configure in .env file");


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database
connectionTodb().then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Routes
app.use('/api/interview', protect, interviewRoutes);
app.use('/api/interviews', protect, interviewsRoutes);
app.use('/api/userAnswer', protect, userAnswerRoutes);
app.use('/api/feedback', protect, feedbackRoutes);
app.use('/api/gemini', protect, geminiRoutes);
app.use('/api/auth', login);
app.use('/api/auth', signup);
app.use('/api/auth', refresh);
app.use('/api/auth', logout);
app.use('/api/feedback/by-user',userfeedback)

// Health check
app.get('/api/health', (req, res) => {
  return res.status(200).json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
