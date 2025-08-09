import { NextResponse } from "next/server";
import connectionTodb from "@/utils/db";
import mongoose from "mongoose";

const mockInterviewSchema = new mongoose.Schema({
  jsonMockResp: String,      // consistent capitalization
  jobPosition: String,
  jobDesc: String,
  jobExperience: String,
  createdBy: String,
  createdAt: String,
});

const MockInterview =
  mongoose.models.MockInterview ||
  mongoose.model("MockInterview", mockInterviewSchema);

// Next.js 13 app router dynamic route handlers get params as second argument
export async function GET(req, { params }) {
  try {
    await connectionTodb();

    const id = params.id; // <- this will now work

    if (!id) {
      return NextResponse.json({ success: false, error: "ID not provided" }, { status: 400 });
    }

    const interview = await MockInterview.findById(id).lean();

    if (!interview) {
      return NextResponse.json({ success: false, error: "Interview not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: interview });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

