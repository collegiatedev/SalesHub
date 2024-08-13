import { ParsedDrafts } from "~/app/constants";
import { SessionStore } from "./session";
import { useQuery } from "@tanstack/react-query";
import { getSessionStore } from "../_actions/redis";

export const sessionToValidDrafts = (session: SessionStore) => {
  if (!session || !session.drafts || !session.personal) return [];
  return Array.from(session.drafts.entries()).filter(
    ([_id, draft]) => draft.type && draft.ready
  ) as ParsedDrafts;
};

// react query hook for session
export const useSessionQuery = (sessionId: string) => {
  const fetchSessionData = async (sessionId: string) => {
    const session = await getSessionStore(sessionId);
    if (!session) throw new Error("Session not found");
    return session;
  };
  const { data, isLoading, error } = useQuery({
    queryKey: ["session", sessionId],
    queryFn: () => fetchSessionData(sessionId),
    refetchOnMount: "always",
  });
  const session = data as SessionStore;
  return { session, isLoading, error };
};
