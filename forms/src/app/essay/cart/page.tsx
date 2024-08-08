import {
  NextPageProps,
  SearchParams,
  SESSION_QUERY_KEY,
} from "~/app/constants";
import { EssayCart } from "./cart";
import { SetSession, SessionProvider } from "./session";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export default async function CartPage({ searchParams }: NextPageProps) {
  const id = getSessionId(searchParams);
  if (!id) return null;

  const sessionInfo = await redis.get(id);
  console.log(sessionInfo);

  const session = {
    drafts: [],
    // personal:
  };

  return (
    <SessionProvider sessionId={id} session={session}>
      <EssayCart />
      <SetSession />
    </SessionProvider>
  );
}

const getSessionId = (searchParams?: SearchParams) => {
  return searchParams?.[SESSION_QUERY_KEY] as string | undefined;
};
