"use client";

import { useEffect, useContext, createContext, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SESSION_QUERY_KEY } from "../constants";
import { generateId } from "~/lib/id";
import { DraftMap, useDraftStore } from "./store";
import { PersonalInfo } from "./cart/personal";
import { getSessionStore } from "../_actions/redis";
import { useQuery } from "@tanstack/react-query";
import { SkeletonEssay } from "~/components/skeletons";
import exp from "constants";

// json string version of session store in redis
export type SessionStoreStrings = {
  personal?: string;
  drafts?: string;
};
export type SessionStore = {
  personal?: PersonalInfo;
  drafts?: DraftMap;
};
type SessionContextType = {
  sessionId: string;
  session: SessionStore;
};
type SessionProviderProps = {
  children: React.ReactNode;
};
const SessionContext = createContext<SessionContextType | undefined>(undefined);
export const SessionProvider = ({ children }: SessionProviderProps) => {
  return (
    <Suspense fallback={<SkeletonEssay />}>
      <SessionProviderContent>{children}</SessionProviderContent>
    </Suspense>
  );
};
const SessionProviderContent = ({ children }: SessionProviderProps) => {
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
