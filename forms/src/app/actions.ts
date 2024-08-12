"use server";

import { Redis } from "@upstash/redis";
import { PersonalInfoForm } from "./essay/cart/personal";
import { DraftMap } from "./essay/store";
import { Draft, ParsedDrafts, SESSION_QUERY_KEY } from "./constants";
import { SessionStore, SessionStoreStrings } from "./essay/session";
import { NEXT_URL, SESSION_EXPIRATION } from "./constants";
import { CheckoutResponse } from "./api/checkout/route";
import { redirect } from "next/navigation";

interface CheckoutOrderProps {
  drafts: ParsedDrafts;
  sessionId: string;
}
export const checkoutOrder = async ({
  drafts,
  sessionId,
}: CheckoutOrderProps) => {
  const response = await fetch(
    `${NEXT_URL}/api/checkout/?${SESSION_QUERY_KEY}=${sessionId}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ drafts }),
    }
  );

  const json = (await response.json()) as CheckoutResponse;
  if (!json.data?.url) throw new Error("No URL returned from Stripe");
  redirect(json.data.url);
};

const redis = Redis.fromEnv();

export const getSessionStrings = async (sessionId: string) => {
  const sessionStrings = ((await redis.get(sessionId)) ||
    {}) as SessionStoreStrings;
  return sessionStrings;
};
export const getSessionStore = async (sessionId: string) => {
  const sessionStrings = await getSessionStrings(sessionId);
  const personal: PersonalInfoForm = JSON.parse(
    sessionStrings.personal || "{}"
  );
  const drafts: DraftMap = new Map(JSON.parse(sessionStrings.drafts || "[]"));
  return { personal, drafts } as SessionStore;
};

interface SavePersonalInfoProps {
  sessionId: string;
  personal: PersonalInfoForm;
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
