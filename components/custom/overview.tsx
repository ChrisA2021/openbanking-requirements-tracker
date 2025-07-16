import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
    <motion.div
      key="overview"
      className="max-w-[500px] mt-20 mx-4 md:mx-0"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: 0.5 }}
    >
      <div className="flex h-full w-full items-center justify-center">
        <button
          className="px-8 py-4 text-xl font-bold rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          onClick={handleSubscribe}
          disabled={loading}
        >
          {loading ? "Subscribing..." : "Click here for email alerts"}
        </button>
      </div>
    </motion.div>
  );
};
