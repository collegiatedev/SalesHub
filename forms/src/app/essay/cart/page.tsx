import { NextPageProps } from "~/app/constants";
import { EssayCart } from ".";
import { SetSession, SessionProvider } from "../session";
import { getSessionStore } from "~/app/actions";
import { getSessionId } from "~/lib/utils";

export default async function CartPage({ searchParams }: NextPageProps) {
  const id = getSessionId(searchParams);
  if (!id) return <SetSession />;

  const session = await getSessionStore(id);

  return (
    <SessionProvider sessionId={id} session={session}>
      <EssayCart />
    </SessionProvider>
  );
}
