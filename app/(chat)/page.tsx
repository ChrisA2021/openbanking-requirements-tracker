"use client";

import { Chat } from "@/components/custom/chat";
import { generateUUID } from "@/lib/utils";
import { useEffect } from "react";

export default function Page() {
  const id = generateUUID();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/github-issues");
        const data = await res.json();
        if (data.issues) {
          data.issues.forEach((issue: any) => {
            console.log(`Title: ${issue.title}`);
            console.log(`Body: ${issue.body}`);
            console.log("---");
          });
        } else {
          console.log("No issues found or error fetching issues.");
        }
      } catch (err) {
        console.error("Error fetching issues:", err);
      }
    })();
  }, []);

  return (
    <div className="flex flex-col items-center w-full">
      <Chat key={id} id={id} initialMessages={[]} />
    </div>
  );
}
