"use client";

import React, { useEffect, useState } from "react";

import { Timeline } from "@/components/custom/timeline";

const GITHUB_ISSUES_URL = process.env.NEXT_PUBLIC_GITHUB_ISSUES_URL;

async function fetchSummaries(issues: any[]): Promise<string[]> {
  // Call your Gemini API endpoint to summarize each issue
  const res = await fetch("/api/gemini-summarize", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ issues }),
  });
  if (!res.ok) throw new Error("Failed to summarize issues");
  const data = await res.json();
  return data.summaries;
}

export default function Page() {
  const [issues, setIssues] = useState<any[]>([]);
  const [summaries, setSummaries] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchIssuesAndSummaries() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/github-issues");
        const data = await res.json();
        if (data.issues) {
          const topIssues = data.issues.slice(0, 10);
          setIssues(topIssues);
          // Fetch summaries from Gemini
          try {
            const summaries = await fetchSummaries(topIssues);
            setSummaries(summaries);
          } catch (summarizeErr) {
            // If Gemini fails, show issues without summaries
            setSummaries([]);
            console.error("Gemini summarization failed:", summarizeErr);
          }
        } else {
          setError("No issues found.");
        }
      } catch (err) {
        setError("Failed to fetch issues.");
      } finally {
        setLoading(false);
      }
    }
    fetchIssuesAndSummaries();
  }, []);

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-background pt-12">
      <h1 className="text-2xl font-bold mb-4">Recent Issues Timeline</h1>
      {loading && <div className="text-gray-500">Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {!loading && !error && <Timeline issues={issues} summaries={summaries} />}
    </div>
  );
}
