import { NextResponse } from "next/server";
import connectionTodb from "@/utils/db";
import mongoose from "mongoose";

// Define schema only if not already in a separate file
const mockInterviewSchema = new mongoose.Schema({
  jsonMockresp: String,
  jobPosition: String,
  jobDesc: String,
  jobExperience: String,
  createdBy: String,
  createdAt: String
});

const MockInterview =
  mongoose.models.MockInterview ||
  mongoose.model("MockInterview", mockInterviewSchema);

export async function POST(req) {
  try {
    // Connect to MongoDB
    await connectionTodb();

    // Parse request body
    const body = await req.json();

    // Save to DB
    const saved = await MockInterview.create(body);

    return NextResponse.json({ success: true, data: saved });
  } catch (err) {
    console.error("MongoDB save error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
