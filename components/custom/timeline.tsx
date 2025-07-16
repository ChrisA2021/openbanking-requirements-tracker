import React from "react";
import { Markdown } from "@/components/custom/markdown";

interface TimelineIssue {
  id: string;
  title: string;
  body: string;
  created_at: string;
  number?: number; // Add number here
}

export const Timeline: React.FC<{ issues: TimelineIssue[]; summaries?: string[] }> = ({ issues, summaries }) => {
  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto mt-8">
      {issues.map((issue, idx) => (
        <div key={issue.id} className="border-l-4 border-blue-500 pl-4 relative flex flex-row gap-6">
          <div className="absolute left-[-10px] top-2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
          <div className="flex flex-col gap-1 flex-1">
            <span className="text-xs text-gray-400">{new Date(issue.created_at).toLocaleString()}</span>
            <span className="font-semibold text-lg text-zinc-900 dark:text-zinc-100">{issue.title}</span>
            <div className="text-sm text-zinc-700 dark:text-zinc-300 [&_h1]:font-bold [&_h2]:font-bold [&_h3]:font-bold [&_h4]:font-bold [&_h5]:font-bold [&_h6]:font-bold">
              <Markdown>{issue.body}</Markdown>
            </div>
          </div>
          {summaries && summaries[idx] && (
            <div className="flex-1 bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4 shadow text-sm text-zinc-800 dark:text-zinc-200 max-w-xs">
              <div className="font-semibold mb-2 text-blue-700 dark:text-blue-300">Summary</div>
              <div>{summaries[idx]}</div>
              {issue.number && (
                <div className="mt-4 text-xs text-gray-500">
                  <span className="font-semibold">GitHub Issue #</span> {issue.number}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
