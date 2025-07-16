import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

async function summarizeWithGemini(issue: any): Promise<string> {
  const prompt = `Summarize the following GitHub issue for a technical audience in 2-3 sentences.\n\nTitle: ${issue.title}\nBody: ${issue.body}`;
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  // The response object may differ, adjust as needed for the actual SDK
  return response.text || "(No summary available)";
}

export async function POST(req: NextRequest) {
  const { issues } = await req.json();
  if (!Array.isArray(issues)) {
    return NextResponse.json({ summaries: [] }, { status: 400 });
  }
  const summaries = await Promise.all(
    issues.map((issue: any) => summarizeWithGemini(issue))
  );
  return NextResponse.json({ summaries });
}
