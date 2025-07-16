"use client"
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

export const SubscribeButton = ({ className }: { className?: string }) => {
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
    <Button
      className={className ?? "py-1.5 px-2 h-fit font-normal bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md"}
      onClick={handleSubscribe}
      disabled={loading}
    >
      {loading ? "Subscribing..." : "Click here for email alerts"}
    </Button>
  );
};
