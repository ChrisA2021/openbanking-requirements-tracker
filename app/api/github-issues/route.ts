import { NextRequest } from "next/server";

import { ISSUE_SOURCES } from "@/lib/issue-sources";

// Fetch issues from a single source (GitHub or other)
async function fetchIssuesFromSource(source: typeof ISSUE_SOURCES[number], token?: string) {
  if (source.type === "github") {
    const res = await fetch(source.fetchUrl, {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        Accept: "application/vnd.github+json",
      },
    });
    if (!res.ok) {
      throw new Error(`GitHub API error: ${res.status}`);
    }
    return res.json();
  }
  // Add more source types as needed
  throw new Error(`Unsupported source type: ${source.type}`);
}

export async function GET(request: NextRequest) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return new Response("GitHub token not set in environment", { status: 500 });
  }

  try {
    // Aggregate issues from all sources
    let allIssues: any[] = [];
    for (const source of ISSUE_SOURCES) {
      const issues = await fetchIssuesFromSource(source, token);
      allIssues = allIssues.concat(issues);
    }
    return Response.json({ issues: allIssues });
  } catch (e: any) {
    return new Response(e.message, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  return GET(request);
}
