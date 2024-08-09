"use client";

import { useEffect, useContext, createContext, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SESSION_QUERY_KEY } from "../constants";
import { generateId } from "~/lib/id";
import { DraftMap, useDraftStore } from "./cart/store";
import { PersonalInfoForm } from "./cart/personal";

// creates a session id, sets it as part of query param; use redis to store session
// don't you love suspense? no idea if this is needed, but i'm not fucking finding out
export const SetSession = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SetSessionContent />
    </Suspense>
  );
};
const SetSessionContent = () => {
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
type SessionProviderProps = {
  children: React.ReactNode;
} & SessionContextType;
export const SessionProvider = ({
  children,
  session,
  sessionId,
}: SessionProviderProps) => {
  // only runs once, initializes drafts in store
  const { initializeDrafts } = useDraftStore();
  useEffect(() => initializeDrafts(session.drafts));

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
