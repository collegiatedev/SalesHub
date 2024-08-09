import {
  NextPageProps,
  SearchParams,
  SESSION_QUERY_KEY,
} from "~/app/constants";
import { EssayCart } from ".";
import { SetSession, SessionProvider } from "./session";
import { getSessionStore } from "~/app/actions";

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

const getSessionId = (searchParams?: SearchParams) => {
  return searchParams?.[SESSION_QUERY_KEY] as string | undefined;
};
