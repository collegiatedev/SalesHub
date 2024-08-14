"use server";

import { Redis } from "@upstash/redis";
import { PersonalInfo } from "../essay/cart/personal";
import { DraftMap } from "../essay/store";
import { Draft, SPOTS_QUERY_KEY, WAITING_LIST_QUERY_KEY } from "../constants";
import { SessionStore, SessionStoreStrings } from "../essay/_base/session";
import { SESSION_EXPIRATION } from "../constants";

const redis = Redis.fromEnv();

export const getSessionStrings = async (sessionId: string) => {
  const sessionStrings = ((await redis.get(sessionId)) ||
    {}) as SessionStoreStrings;
  return sessionStrings;
};
export const getSessionStore = async (sessionId: string) => {
  const sessionStrings = await getSessionStrings(sessionId);
  const personal: PersonalInfo = JSON.parse(sessionStrings.personal || "{}");
  const drafts: DraftMap = new Map(JSON.parse(sessionStrings.drafts || "[]"));
  return { personal, drafts } as SessionStore;
};

interface SavePersonalInfoProps {
  sessionId: string;
  personal: PersonalInfo;
}
export const savePersonalInfo = async ({
  sessionId,
  personal,
}: SavePersonalInfoProps) => {
  const { drafts } = await getSessionStrings(sessionId);
  const session = {
    drafts,
    personal: JSON.stringify(personal),
  } as SessionStoreStrings;
  await redis.set(sessionId, session, {
    ex: SESSION_EXPIRATION,
  });
};

interface SaveDraftProps {
  sessionId: string;
  draft: Draft;
  draftId: number;
}
export const saveDraft = async ({
  sessionId,
  draft,
  draftId,
}: SaveDraftProps) => {
  const { personal } = await getSessionStrings(sessionId); // unstructured
  const { drafts } = await getSessionStore(sessionId); // structured shape

  const draftsMap: DraftMap = new Map(drafts);

  draftsMap.set(draftId, draft);

  const session = {
    personal,
    drafts: JSON.stringify(Array.from(draftsMap.entries())),
  } as SessionStoreStrings;

  await redis.set(sessionId, session, { ex: SESSION_EXPIRATION });
};

// rename conventions needed
interface RemoveDraftProps {
  sessionId: string;
  draftId: number;
}
export const removeDraft = async ({ sessionId, draftId }: RemoveDraftProps) => {
  const { personal } = await getSessionStrings(sessionId); // unstructured
  const { drafts } = await getSessionStore(sessionId); // structured shape

  const draftsMap: DraftMap = new Map(drafts);

  draftsMap.delete(draftId);

  const session = {
    personal,
    drafts: JSON.stringify(Array.from(draftsMap.entries())),
  } as SessionStoreStrings;

  await redis.set(sessionId, session, { ex: SESSION_EXPIRATION });
};

export const deleteSession = async (sessionId: string) => {
  await redis.del(sessionId);
};

export const getSpotsRemaining = async () => {
  const spots = (await redis.get(SPOTS_QUERY_KEY)) as number;
  return spots;
};

export const addToWaitingList = async ({ email }: { email: string }) => {
  const waitingList = (await redis.lrange(WAITING_LIST_QUERY_KEY, 0, -1)) || [];
  if (!waitingList.includes(email)) {
    await redis.rpush(WAITING_LIST_QUERY_KEY, email);
  }
};
