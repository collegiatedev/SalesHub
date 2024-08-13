"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { successfulToast } from "~/components/myToast";
import { SESSION_QUERY_KEY } from "../constants";

// handles successful purchase
// todo, treat component as general alert component for form status
export const HandlePurchase = () => {
  const router = useRouter();
  const params = useSearchParams();
  const success = params.get("success");
  if (success) {
    const sessionId = params.get(SESSION_QUERY_KEY);
    if (!sessionId) throw new Error("No session id found");

    successfulToast("Congratulations! Everything has been submitted.");
    // Refresh the page to remove the 'success' parameter
    const newParams = new URLSearchParams(params.toString());
    newParams.delete("success");
    newParams.delete(SESSION_QUERY_KEY);
    router.replace(`${window.location.pathname}?${newParams.toString()}`, {
      scroll: false,
    });
  }

  return null;
};
