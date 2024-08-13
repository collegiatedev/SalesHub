"use client";

import { useQuery } from "@tanstack/react-query";
import { Draft } from "~/app/constants";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { ItemPrice } from "../price";
import { SkeletonEssay } from "~/components/skeletons";
import { getSessionStore } from "~/app/_actions/redis";
import { SessionStore } from "../session";
import { sessionToValidDrafts } from "./helper";

const fetchSessionData = async (sessionId: string) => {
  const session = await getSessionStore(sessionId);
  if (!session) throw new Error("Session not found");
  return session;
};

interface OrderProps {
  sessionId: string;
}
export const Orders = ({ sessionId }: OrderProps) => {
  // idk what to do besides double fetching
  const { data, isLoading, error } = useQuery({
    queryKey: ["session", sessionId],
    queryFn: () => fetchSessionData(sessionId),
    refetchOnMount: "always",
  });
  const session = data as SessionStore;

  if (isLoading) return <SkeletonEssay />;
  if (error || !session || !session.personal || !session.drafts) {
    return <div>Error. No essays found.</div>;
  }

  const drafts = sessionToValidDrafts(session);
  return (
    <>
      {drafts.map(([id, draft]) => (
        <ConfirmOrder id={id} draft={draft} key={id} />
      ))}
    </>
  );
};

interface ConfirmOrderProps {
  id: number;
  draft: Draft;
}
const ConfirmOrder = ({ id, draft }: ConfirmOrderProps) => {
  const createDesc = (sub: string) => {
    const add = sub.length > 120 ? "..." : "";
    return sub.slice(0, 120) + add;
  };
  const description = createDesc(draft.questions.submission as string);

  return (
    <Card className="w-full" key={id}>
      <div className="flex justify-between items-center">
        <CardHeader>
          <CardTitle>{draft.title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardHeader>
          <ItemPrice draft={draft} />
        </CardHeader>
      </div>
    </Card>
  );
};
