import mongoose from "mongoose";

const mockInterviewSchema = new mongoose.Schema({
  jsonMockResp: { type: String, required: true },
  jobPosition: { type: String, required: true },
  jobDesc: { type: String, required: true },
  jobExperience: { type: String, required: true },
  createdBy: { type: String, required: true },
  createdAt: { type: String, default: () => new Date().toISOString() }, // Optional if not passed
  mockId: { type: String, required: true }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// MongoDB uses _id instead of id by default
const MockInterview = mongoose.models.MockInterview || mongoose.model("MockInterview", mockInterviewSchema);

export default MockInterview;

