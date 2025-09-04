import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { db } from "@/firebase/admin";
import { getRandomInterviewCover } from "@/lib/utils";

export async function POST(request: Request) {
  const { type, role, level, techstack, amount, userid } = await request.json();

  if (!type || !role || !level || !techstack || !amount || !userid) {
    return Response.json(
      { success: false, error: "Missing required parameters" },
      { status: 400 }
    );
  }

  const userRef = db.collection("users").doc(userid);
  const userDoc = await userRef.get();

  if (!userDoc.exists) {
    return Response.json(
      { success: false, error: "User not found" },
      { status: 404 }
    );
  }

  const userData = userDoc.data();
  const currentCredits = userData?.credits ?? 0;

  if (currentCredits <= 0) {
    return Response.json(
      { success: false, error: "No credits left" },
      { status: 403 }
    );
  }

  // Deduct credit immediately
  await userRef.update({ credits: currentCredits - 1 });

  try {
    // Generate prompt
    const prompt = `Prepare questions for a job interview.
The job role is ${role}.
The job experience level is ${level}.
The tech stack used in the job is: ${techstack}.
The focus between behavioural and technical questions should lean towards: ${type}.
The amount of questions required is: ${amount}.
Please return only the questions, without any additional text.
Return like this:
["Question 1", "Question 2", "Question 3"]

IMPORTANT: Return ONLY the JSON array, no markdown formatting, no code blocks.`;

    const { text: questions } = await generateText({
      model: google("gemini-2.5-flash") as any,
      prompt,
    });

    const cleanQuestions = questions
      .replace(/^\s*`+/gm, "")
      .replace(/`+\s*$/gm, "")
      .trim();

    let parsedQuestions;
    try {
      parsedQuestions = JSON.parse(cleanQuestions);
    } catch (err) {
      throw new Error("Invalid JSON format from AI");
    }

    if (!Array.isArray(parsedQuestions)) {
      throw new Error("AI response is not an array");
    }

    const techstackArray =
      typeof techstack === "string"
        ? techstack.split(",").map((t) => t.trim())
        : techstack;

    const interview = {
      role,
      type,
      level,
      techstack: techstackArray,
      questions: parsedQuestions,
      userId: userid,
      finalized: true,
      coverImage: getRandomInterviewCover(),
      createdAt:
        new Date().toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }) + " IST",
    };

    await db.collection("interviews").add(interview);

    // 🔹 Get updated credits after deduction
    const updatedUserDoc = await userRef.get();
    const updatedCredits = updatedUserDoc.data()?.credits ?? 0;

    return Response.json(
      { success: true, interview, credits: updatedCredits },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during interview generation:", error);

    // 🔹 Refund the credit if AI fails
    await userRef.update({ credits: currentCredits });

    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
