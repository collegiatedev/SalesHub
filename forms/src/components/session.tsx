"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchParams, SESSION_KEY } from "~/app/constants";
import { generateId } from "~/lib/id";

// creates a session id, sets it as part of query param; use redis to store session
export const SetSession = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (!params.has(SESSION_KEY)) {
      const sessionId = generateId();
      params.set(SESSION_KEY, sessionId);
    }

    router.replace(`?${params.toString()}`);
  }, [router, searchParams]);

  return null;
};

// use in server component
export const getSessionId = (searchParams?: SearchParams) => {
  return searchParams?.s as string;
};
