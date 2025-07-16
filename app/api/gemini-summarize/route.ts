import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=";

async function summarizeWithGemini(issue: any): Promise<string> {
  const prompt = `Summarize the following GitHub issue for a non-technical audience in 2-3 sentences:\n\nTitle: ${issue.title}\nBody: ${issue.body}`;
  const res = await fetch(GEMINI_API_URL + GEMINI_API_KEY, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });
  if (!res.ok) return "(Failed to summarize)";
  const data = await res.json();
  return (
    data?.candidates?.[0]?.content?.parts?.[0]?.text || "(No summary available)"
  );
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
