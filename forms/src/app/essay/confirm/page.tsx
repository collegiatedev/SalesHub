import { NextPageProps } from "~/app/constants";
import { getSessionId } from "~/lib/utils";
import { Suspense } from "react";
import { SkeletonEssay } from "~/components/skeletons";
import { Orders } from "./orders";
import { getSessionStore } from "~/app/_actions/redis";
import { checkoutOrder } from "~/app/_actions/checkout";
import { NavButton, CheckoutButton } from "~/components/myButtons";
import { MyTitle } from "~/components/myTitle";
import { TotalPrice } from "../price";
import { sessionToValidDrafts } from "./helper";

export default function ConfirmPage({ searchParams }: NextPageProps) {
  const sessionId = getSessionId(searchParams);
  // really should switch to cookie setup
  if (!sessionId) return <div>Error. No essays found.</div>;

  // TODO: this is a bit of a mess, clean up with orders
  const handleCheckout = async () => {
    "use server";
    const session = await getSessionStore(sessionId);
    if (!session || !session.drafts || !session.personal)
      throw new Error("No essays found.");
    const drafts = sessionToValidDrafts(session);
    // await generateDrive({ drafts, personal: session.personal! });
    await checkoutOrder({ drafts, sessionId });
  };

  return (
    <Suspense fallback={<SkeletonEssay />}>
      <>
        <div className="flex justify-between items-start ">
          <div className="flex gap-3 w-full">
            <NavButton route="/essay/cart" text="Back" backwards />
            <MyTitle title="Confirm Order" />
          </div>
          <TotalPrice />
        </div>
        <div className="space-y-4">
          <Orders sessionId={sessionId} />
        </div>
        <div className="mt-8">
          <form action={handleCheckout}>
            <CheckoutButton onCheckout={handleCheckout} />
          </form>
        </div>
      </>
    </Suspense>
  );
}
