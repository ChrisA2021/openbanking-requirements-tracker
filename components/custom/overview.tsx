import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import React from "react";

export const Overview = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/subscribe-email-alerts", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "You are now subscribed for email alerts!");
      } else {
        toast.error(data.error || "Failed to subscribe for email alerts.");
      }
    } catch (e) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="size-full flex items-center justify-center">
      <button
        className="px-8 py-4 text-xl font-bold rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
        onClick={handleSubscribe}
        disabled={loading}
      >
        {loading ? "Subscribing..." : "Click here for email alerts"}
      </button>
    </div>
  );
};
