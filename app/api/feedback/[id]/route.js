import connectionTodb from "@/utils/db";
import { UserAnswer } from "@/utils/schema";

export async function GET(req, { params }) {
  try {
    await connectionTodb();

    const mockId = params.id; // get id from the URL path param

    if (!mockId) {
      return new Response(
        JSON.stringify({ error: "Missing id param" }),
        { status: 400 }
      );
    }

    // Find all documents where mockId field matches the param
    const answers = await UserAnswer.find({ mockId }).sort({ _id: 1 });

    return new Response(JSON.stringify(answers), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: "Failed to fetch data" }),
      { status: 500 }
    );
  }
}
