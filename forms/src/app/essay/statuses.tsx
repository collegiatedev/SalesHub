"use client";

import { NEXT_URL, SESSION_QUERY_KEY } from "../constants";
import { useRouter, useSearchParams } from "next/navigation";
import { errorToast, successfulToast } from "~/components/myToast";
import { useEffect } from "react";
import { generateId } from "~/lib/id";
import { toast } from "sonner";

// handles query params for successful purchase and other status messages
// todo, treat component as general alert component for form status
export const HandleStatuses = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createNewSession = () =>
    router.replace(`${NEXT_URL}/essay/?${SESSION_QUERY_KEY}=${generateId()}`);

  useEffect(() => {
    if (searchParams.has("success")) {
      toast.dismiss();
      successfulToast("Congratulations! Everything has been submitted.");
      createNewSession();
    } else if (searchParams.has("error")) {
      toast.dismiss();
      errorToast("Something went wrong. Please try again.");
      createNewSession();
    }
  }, [searchParams, router]);

  return null;
};
