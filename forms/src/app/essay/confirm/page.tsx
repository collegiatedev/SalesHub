import { ERROR_ROUTE, NextPageProps } from "~/app/constants";
import { getSessionId } from "../../helpers";
import { Suspense } from "react";
import { SkeletonEssay } from "~/components/skeletons";
import { Orders } from "./orders";
import { getSessionStore } from "~/app/_actions/redis";
import { checkoutOrder } from "~/app/_actions/checkout";
import { NavButton, CheckoutButton } from "~/components/myButtons";
import { MyTitle } from "~/components/myTitle";
import { TotalPrice } from "../_components/price";
import { sessionToValidDrafts } from "../../helpers";
import { redirect } from "next/navigation";

export default function ConfirmPage({ searchParams }: NextPageProps) {
  const sessionId = getSessionId(searchParams);
  if (!sessionId) redirect(ERROR_ROUTE);

  // TODO: this is a bit of a mess, clean up alongside orders.tsx
  const handleCheckout = async () => {
    "use server";
    const session = await getSessionStore(sessionId);
    if (!session || !session.drafts || !session.personal) redirect(ERROR_ROUTE);
    const drafts = sessionToValidDrafts(session);
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
