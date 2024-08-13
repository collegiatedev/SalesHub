"use client";

import { NEXT_URL } from "../constants";
import { useRouter, useSearchParams } from "next/navigation";
import { successfulToast } from "~/components/myToast";

// handles query params for successful purchase and other status messages
// todo, treat component as general alert component for form status
export const HandleStatuses = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (searchParams.has("success")) {
    successfulToast("Congratulations! Everything has been submitted.");
    router.replace(`${NEXT_URL}/essay/`);
  }

  return null;
};
