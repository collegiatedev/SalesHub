"use client";

import { useEffect, useContext, createContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SESSION_QUERY_KEY } from "../constants";
import { generateId } from "~/lib/id";
import { DraftMap, useDraftStore } from "./store";
import { PersonalInfoForm } from "./cart/personal";
import { getSessionStore } from "../actions";
import { useQuery } from "@tanstack/react-query";
import { SkeletonEssay } from "~/components/skeletons";

// json string version of session store in redis
export type SessionStoreStrings = {
  personal?: string;
  drafts?: string;
};
export type SessionStore = {
  personal?: PersonalInfoForm;
  drafts?: DraftMap;
};
type SessionContextType = {
  sessionId: string;
  session: SessionStore;
};
const SessionContext = createContext<SessionContextType | undefined>(undefined);
export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const params = useSearchParams();
  const { initializeDrafts } = useDraftStore();
  const sessionId = params.get(SESSION_QUERY_KEY);
  const router = useRouter();

  // generates a new session id if none is provided
  useEffect(() => {
    if (!sessionId) {
      const newSessionId = generateId();
      const newParams = new URLSearchParams(params.toString());
      newParams.set(SESSION_QUERY_KEY, newSessionId);
      router.replace(`?${newParams.toString()}`);
    }
  }, [sessionId, router, params]);

  const {
    data: session,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [SESSION_QUERY_KEY, sessionId],
    queryFn: async () => {
      if (!sessionId) return {};
      const session = await getSessionStore(sessionId);
      initializeDrafts(session.drafts);
      return session;
    },
    enabled: !!sessionId, // Only run the query if sessionId is available
  });

  if (isLoading || !sessionId) return <SkeletonEssay />;
  if (isError) return <div>Error loading session.</div>;

  return (
    <SessionContext.Provider value={{ sessionId, session: session || {} }}>
      {children}
    </SessionContext.Provider>
  );
};

// hook
export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
