// "use client";

import { successfulToast } from "~/components/myToast";
import { SearchParams, SESSION_QUERY_KEY } from "../constants";
import { getSessionId } from "./helpers";

// handles query params for successful purchase and other status messages
// todo, treat component as general alert component for form status
interface StatusesProps {
  searchParams: SearchParams;
}
export const Statuses = async ({ searchParams }: StatusesProps) => {
  const success = searchParams["success"];
  if (success) await handleSuccess(searchParams);

  return null;
};

const handleSuccess = async (searchParams: SearchParams) => {
  const sessionId = getSessionId(searchParams);
  if (!sessionId) return;

  successfulToast("Congratulations! Everything has been submitted.");

  return;

  // Refresh the page to remaining parameters
  // const newParams = new URLSearchParams(params.toString());
  // newParams.delete("success");
  // newParams.delete(SESSION_QUERY_KEY);
  // router.replace(`${window.location.pathname}?${newParams.toString()}`, {
  //   scroll: false,
  // });
};
