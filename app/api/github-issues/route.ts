import { NextRequest } from "next/server";
import { z } from "zod";

const GITHUB_ISSUES_URL = "https://api.github.com/repos/ConsumerDataStandardsAustralia/standards-maintenance/issues";

// Fetch issues from GitHub using MCP and Gemini
async function fetchIssuesFromGitHub(token: string) {
  const res = await fetch(GITHUB_ISSUES_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
    },
  });
  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status}`);
  }
  return res.json();
}

export async function GET(request: NextRequest) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return new Response("GitHub token not set in environment", { status: 500 });
  }

  try {
    // Fetch issues
    const issues = await fetchIssuesFromGitHub(token);
    // Optionally, you could use Gemini here to summarize or process issues
    // For now, just return the issues
    return Response.json({ issues });
  } catch (e: any) {
    return new Response(e.message, { status: 500 });
  }
}

// POST endpoint for future use (e.g., to trigger from Lambda)
export async function POST(request: NextRequest) {
  return GET(request);
}
