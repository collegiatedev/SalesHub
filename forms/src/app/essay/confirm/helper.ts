import { ParsedDrafts } from "~/app/constants";
import { SessionStore } from "../session";

export const sessionToValidDrafts = (session: SessionStore) => {
  if (!session || !session.drafts || !session.personal) return [];
  return Array.from(session.drafts.entries()).filter(
    ([_id, draft]) => draft.type && draft.ready
  ) as ParsedDrafts;
};
