"use client";

import { Draft, ERROR_ROUTE } from "~/app/constants";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { ItemPrice } from "../_components/price";
import { SkeletonEssay } from "~/components/skeletons";
import { sessionToValidDrafts, useSessionQuery } from "../../helpers";
import { useRouter } from "next/navigation";

export const Orders = ({ sessionId }: { sessionId: string }) => {
  // idk what to do besides double fetching
  const { session, isLoading, error } = useSessionQuery(sessionId);
  const router = useRouter();

  if (isLoading) return <SkeletonEssay />;
  if (
    error ||
    !session ||
    !session.personal ||
    !session.drafts ||
    session.drafts.size === 0
  )
    router.replace(ERROR_ROUTE);

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
