import mongoose from "mongoose";

const mockInterviewSchema = new mongoose.Schema({
  jsonMockResp: { type: String, required: true },
  jobPosition: { type: String, required: true },
  jobDesc: { type: String, required: true },
  jobExperience: { type: String, required: true },
  createdBy: { type: String, required: true },
  createdAt: { type: String, default: () => new Date().toISOString() },
  mockId: { type: String, required: true }
}, { timestamps: true });

export const MockInterview =
  (mongoose.models && mongoose.models.MockInterview) ||
  mongoose.model("MockInterview", mockInterviewSchema);

const userAnswerSchema = new mongoose.Schema({
  mockId: { type: String, required: true },
  question: { type: String, required: true },
  correctAns: String,
  userAns: String,
  feedback: String,
  rating: String,
  userEmail: String,
  createdAt: { type: String, default: () => new Date().toISOString() }
});

export const UserAnswer =
  (mongoose.models && mongoose.models.UserAnswer) ||
  mongoose.model("UserAnswer", userAnswerSchema);
