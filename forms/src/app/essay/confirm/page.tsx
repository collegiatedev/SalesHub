import { getSessionStore } from "~/app/_actions/redis";
import { checkoutOrder, generateDrive } from "~/app/_actions/checkout";
import { NextPageProps, ParsedDrafts } from "~/app/constants";
import { CheckoutButton, NavButton } from "~/components/myButtons";
import { MyTitle } from "~/components/myTitle";
import { getSessionId } from "~/lib/utils";
import { Draft } from "~/app/constants";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { ItemPrice, TotalPrice } from "../price";
import { Suspense } from "react";
import { SkeletonEssay } from "~/components/skeletons";

export default async function ConfirmPage({ searchParams }: NextPageProps) {
  return (
    <Suspense fallback={<SkeletonEssay />}>
      <ConfirmPageContent searchParams={searchParams} />
    </Suspense>
  );
}

const ConfirmPageContent = async ({ searchParams }: NextPageProps) => {
  const sessionId = getSessionId(searchParams);
  // probably just do a redirect; should switch to cookie setup anyways
  if (!sessionId) return <div>Error. No essays found.</div>;
  const session = await getSessionStore(sessionId);

  // isn't it crazy that you can't .map() over a map?
  const drafts = Array.from(session.drafts?.entries() || []).filter(
    ([_id, draft]) => draft.type && draft.ready
  ) as ParsedDrafts;

  const handleCheckout = async () => {
    "use server";
    await generateDrive({ drafts, personal: session.personal! });
    // await checkoutOrder({ drafts, sessionId });
  };

  if (!session.personal || !session.drafts)
    return <div>Error. No essays found.</div>;

  return (
    <>
      <div className="flex justify-between items-start ">
        <div className="flex gap-3 w-full">
          <NavButton route="/essay/cart" text="Back" backwards />
          <MyTitle title="Confirm Order" />
        </div>
        <TotalPrice />
      </div>
      <div className="space-y-4">
        {drafts.map(([id, draft]) => (
          <ConfirmOrder id={id} draft={draft} key={id} />
        ))}
      </div>
      <div className="mt-8">
        {/* <form action="/api/checkout_sessions" method="POST"> */}
        <form action={handleCheckout}>
          <CheckoutButton onCheckout={handleCheckout} />
        </form>
      </div>
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
