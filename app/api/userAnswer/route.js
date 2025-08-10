import { NextResponse } from "next/server";
import connectionTodb from "@/utils/db";
import { UserAnswer } from "@/utils/schema"; // <-- Make sure this exists

export async function POST(req) {
  await connectionTodb();
  const data = await req.json();
  const newAnswer = await UserAnswer.create(data);
  return NextResponse.json(newAnswer);
}
