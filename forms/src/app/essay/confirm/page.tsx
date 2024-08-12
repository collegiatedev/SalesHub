import { checkoutOrder, getSessionStore } from "~/app/actions";
import { NextPageProps, ParsedDrafts } from "~/app/constants";
import { NavButton } from "~/components/myButtons";
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
import { Button } from "~/components/ui/button";

export default async function ConfirmPage({ searchParams }: NextPageProps) {
  const sessionId = getSessionId(searchParams);
  // probably just do a redirect; should switch to cookie setup anyways
  if (!sessionId) return <div>Error. No essays found.</div>;
  const session = await getSessionStore(sessionId);

  // isn't it crazy that you can't .map() over a map?
  const drafts = Array.from(session.drafts?.entries() || []).filter(
    ([_id, draft]) => draft.type && draft.ready
  ) as ParsedDrafts;

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
          <ConfirmOrder id={id} draft={draft} />
        ))}
      </div>
      <div className="mt-8">
        {/* <form action="/api/checkout_sessions" method="POST"> */}
        <form
          action={async () => {
            "use server";
            await checkoutOrder({ drafts, sessionId });
          }}
        >
          {/* <input type="hidden" name="draft" value={myDrafts} /> */}
          <Button size="lg" className="w-full" type="submit">
            Checkout
          </Button>
        </form>
      </div>
    </>
  );
}

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
