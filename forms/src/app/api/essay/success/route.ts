import { NextResponse } from "next/server";
import { reqHandler } from "../../_handlers";
import { NEXT_URL, ParsedDrafts, SESSION_QUERY_KEY } from "~/app/constants";
import { withEndpoint } from "../../helpers";
import { qstashPublish } from "../../_handlers/input";
import { getSessionStore } from "~/app/_actions/redis";
import { redisClient } from "../../constants";
import { PersonalInfo } from "~/app/essay/cart/personal";
import { sessionToValidDrafts } from "~/app/helpers";

export const GET = reqHandler<any>({
  required: { params: [SESSION_QUERY_KEY] },
  handler: async (parsed) => {
    const sessionId = parsed[SESSION_QUERY_KEY] as string;

    const session = await getSessionStore(sessionId);
    const drafts = sessionToValidDrafts(session);
    const personal = session.personal;
    if (!drafts || !personal) throw new Error("No session found");

    const route = withEndpoint("/api/essay/", NEXT_URL);
    const input = { drafts, personal } as SuccessfulPurchaseInput;
    await qstashPublish({ route, input });

    redisClient.del(sessionId);

    return NextResponse.redirect(`${NEXT_URL}/essay/?success=true`);
  },
});
export type SuccessfulPurchaseInput = {
  drafts: ParsedDrafts;
  personal: PersonalInfo;
};
