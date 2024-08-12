import { ParsedDrafts } from "~/app/constants";
import { AccountType, oauthHandler } from "../_handlers/oauth";
import { PersonalInfo } from "~/app/essay/cart/personal";

// create essay, then notify admin on discord
export const POST = oauthHandler({
  required: { body: ["drafts", "personal"] },
  handler: async (parsed, _req, googleClient) => {
    const drafts = parsed.drafts as ParsedDrafts;
    const personal = parsed.personal as PersonalInfo;

    return { message: "Hello World" };
  },
  accountType: AccountType.Admin,
});
