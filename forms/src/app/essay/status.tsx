"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { successfulToast } from "~/components/myToast";
import { SESSION_QUERY_KEY } from "../constants";

// handles query params for successful purchase and other status messages
// todo, treat component as general alert component for form status
export const HandleStatuses = () => {
  const router = useRouter();
  const params = useSearchParams();
  const success = params.get("success");
  if (success) {
    const sessionId = params.get(SESSION_QUERY_KEY);
    if (!sessionId) throw new Error("No session id found");

    successfulToast("Congratulations! Everything has been submitted.");

    // Refresh the page to remaining parameters
    const newParams = new URLSearchParams(params.toString());
    newParams.delete("success");
    newParams.delete(SESSION_QUERY_KEY);
    router.replace(`${window.location.pathname}?${newParams.toString()}`, {
      scroll: false,
    });
  }

  return null;
};
