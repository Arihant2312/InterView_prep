"use server";

import { auth, db } from "@/firebase/admin";
import { generateObject } from "ai";
import { cookies } from "next/headers";
//import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { feedbackSchema } from "@/constants";
// ...existing code...

/**
 * Get all finalized interviews created by any user.
 * Returns interviews sorted by newest first.
 */
export async function getAllFinalizedInterviews(limit: number = 20): Promise<Interview[] | null> {
  const interviews = await db
    .collection("interviews")
    .where("finalized", "==", true)
    .orderBy("createdAt", "desc")
    .limit(limit)
    .get();

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  })) as Interview[];
}

// ...existing code...
export async function getInterviewsByUserId(userId:string):Promise<Interview[] |null>{
  const interviews=await db
  .collection("interviews")
  .where("userId", "==", userId)
  .orderBy("createdAt", "desc")
  .get();
  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  })) as Interview[];

}
export async function getLatestInterviews(params:GetLatestInterviewsParams):Promise<Interview[] |null>{
  const {userId,limit=20}=params;
const interviews = await db
  .collection("interviews")
  .orderBy("createdAt", "desc")
  .where("finalized", "==", true)
 
  .limit(limit)
  .get();
  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  })) as Interview[];

}

export async function getInterviewsById(id:string):Promise<Interview |null>{
  const interview=await db
  .collection("interviews")
    .doc(id)
    .get();
  
  return interview.data()  as Interview | null;

}
export async function createFeedback(params: CreateFeedbackParams) {
  const { interviewId, userId, transcript } = params;

  try {
    if (!transcript || transcript.length === 0) {
      return {
        success: false,
        message: "Transcript is empty. Cannot generate feedback.",
      };
    }

    const formattedTranscript = transcript.map((sentence) => ({
      role: sentence.role,
      content: sentence.content.trim(),
    }));

    const formattedTranscriptString = formattedTranscript
      .map((s) => `${s.role.toUpperCase()}: ${s.content}`)
      .join("\n");

    // Generate structured feedback using Gemini
    const {
      object: {
        totalScore,
        categoryScores,
        strengths,
        areasForImprovement,
        finalAssessment,
      },
    } = await generateObject({
      model: google("gemini-2.5-flash", { structuredOutputs: false }),
      schema: feedbackSchema,
      prompt: `
You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories.
Be thorough and detailed in your analysis. Give fair scores from 0 to 100 based on the quality of responses.
Do not artificially inflate the scores. Provide constructive feedback, strengths, and areas for improvement.

Transcript:
${formattedTranscriptString}

Please score the candidate from 0 to 100 in the following areas. Only use these categories:
- Communication Skills: Clarity, articulation, structured responses.
- Technical Knowledge: Understanding of key concepts for the role.
- Problem-Solving: Ability to analyze problems and propose solutions.
- Cultural & Role Fit: Alignment with company values and job role.
- Confidence & Clarity: Confidence in responses, engagement, and clarity.
`,
      system:
        "You are a professional interviewer analyzing a mock interview. Provide structured category scores, strengths, areas for improvement, and a final assessment.",
    });

    // Convert AI scores to numeric and transform to array
    const numericTotalScore = totalScore
      ? typeof totalScore === "number"
        ? totalScore
        : Number(totalScore)
      : 0;

    const categoryArray: { name: string; score: number; comment: string }[] = [];

    if (categoryScores && typeof categoryScores === "object") {
      for (const [name, value] of Object.entries(categoryScores)) {
        const score = typeof value === "number" ? value : Number(value);
        if (!isNaN(score)) {
          categoryArray.push({
            name,
            score,
            comment: "", // You can add AI-generated comment if available
          });
        }
      }
    }

    // Save feedback in Firestore
    const feedback = await db.collection("feedback").add({
      interviewId,
      userId,
      totalScore: numericTotalScore,
      categoryScores: categoryArray, // <-- array now
      areasForImprovement: areasForImprovement || [],
      strengths: strengths || [],
      finalAssessment: finalAssessment || "",
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
    });

    await db.collection("interviews").doc(interviewId).update({
      hasFeedback: true,
    });

    return {
      success: true,
      feedbackId: feedback.id,
    };
  } catch (e) {
    console.error("Error creating feedback:", e);
    return {
      success: false,
      message: "Failed to create feedback. Please try again.",
    };
  }
}


export async function getFeedbackByInterviewId(params:GetFeedbackByInterviewIdParams):Promise<Feedback|null>{
  const { interviewId,userId}=params;
  const feedback=await db
  .collection("feedback")
  
  .where("interviewId", "==", interviewId)
  .where('userId','==',userId)
  .limit(1) 
  .get();
  if(feedback.empty) return null;
  const feedbackDoc=feedback.docs[0];
  return {
    id: feedbackDoc.id,
    ...feedbackDoc.data()
  } as Feedback;

}