import { getSessionStore } from "~/app/actions";
import { NextPageProps } from "~/app/constants";
import { NavButton } from "~/components/myButtons";
import { MyTitle } from "~/components/myTitle";
import { getSessionId } from "~/lib/utils";
import { Draft } from "../cart/store";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { TotalPrice } from "../price";

export default async function ConfirmPage({ searchParams }: NextPageProps) {
  const id = getSessionId(searchParams);
  // probably just do a redirect; should switch to cookie setup anyways
  if (!id) return <div>Error. No essays found.</div>;
  const session = await getSessionStore(id);

  // isn't it crazy that you can't .map() over a map?
  const draft = Array.from(session.drafts?.entries() || []);

  return (
    <>
      <div className="flex justify-items-start gap-3">
        <NavButton route="/essay/cart" text="Back" backwards />
        <MyTitle title="Confirm Order" />
      </div>
      <div className="space-y-4">
        {draft.map(([id, draft]) => (
          <ConfirmOrder id={id} draft={draft} />
        ))}
      </div>
    </>
  );
}

interface ConfirmOrderProps {
  id: number;
  draft: Draft;
}
const ConfirmOrder = ({ id, draft }: ConfirmOrderProps) => {
  const sub = draft.questions.submission as string;
  const add = sub.length > 120 ? "..." : "";
  const description = sub.slice(0, 120) + add;

  return (
    <Card className="w-full" key={id}>
      <CardHeader>
        <CardTitle>{draft.title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardHeader>
        <TotalPrice />
      </CardHeader>
    </Card>
  );
};
