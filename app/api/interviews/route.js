import connectionTodb from '@/utils/db';
import { MockInterview } from '@/utils/schema';

export async function POST(req) {
  try {
    await connectionTodb();

    const { createdBy } = await req.json();

    const emailToUse = createdBy || "example@gmail.com";

    const interviews = await MockInterview.find({ createdBy: emailToUse }).sort({ _id: -1 });

    console.log('Interviews found:', interviews.length);

    return new Response(JSON.stringify(interviews), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to fetch interviews" }), { status: 500 });
  }
}
