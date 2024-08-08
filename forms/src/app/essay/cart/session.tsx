"use client";

import { useEffect, useContext, createContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SESSION_QUERY_KEY } from "~/app/constants";
import { generateId } from "~/lib/id";
import { DraftArray, useDraftStore } from "./store";
import { PersonalInfo } from "./personal";

// creates a session id, sets it as part of query param; use redis to store session
export const SetSession = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (!params.has(SESSION_QUERY_KEY)) {
      const sessionId = generateId();
      params.set(SESSION_QUERY_KEY, sessionId);
    }

    router.replace(`?${params.toString()}`);
  }, [router, searchParams]);

  return null;
};
type SessionContextType = {
  sessionId: string;
  session: {
    drafts?: DraftArray;
    personal?: PersonalInfo;
  };
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);
type SessionProviderProps = {
  children: React.ReactNode;
} & SessionContextType;
export const SessionProvider = ({
  children,
  session,
  sessionId,
}: SessionProviderProps) => {
  const { initializeDrafts } = useDraftStore();

  useEffect(() => {
    if (session.drafts) initializeDrafts(session.drafts);
  }, [session, initializeDrafts]);

  return (
    <SessionContext.Provider value={{ sessionId, session }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
