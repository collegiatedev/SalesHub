import { getSessionStore } from "~/app/actions";
import { NextPageProps } from "~/app/constants";
import { NavButton } from "~/components/myButtons";
import { MyTitle } from "~/components/myTitle";

import { getSessionId } from "~/lib/utils";

export default async function ConfirmPage({ searchParams }: NextPageProps) {
  const id = getSessionId(searchParams);
  if (!id) return <div>Error. No essays found.</div>;
  const session = await getSessionStore(id);

  return (
    <>
      <div className="flex justify-items-start gap-3">
        <NavButton route="/essay/cart" text="Back" backwards />
        <MyTitle title="Confirm Order" />
      </div>
    </>
  );
}
