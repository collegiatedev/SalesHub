import { ParsedDrafts } from "~/app/constants";
import { AccountType, oauthHandler } from "../_handlers/oauth";
import { PersonalInfo } from "~/app/essay/cart/personal";
import { createFolder } from "../_utils/drive/createFolder";
import { ADMIN_ESSAY_MICRO_FOLDER, ADMIN_TOKEN } from "../constants";

// create essay, then notify admin on discord
export const POST = oauthHandler({
  required: { body: ["drafts", "personal"] },
  handler: async (parsed, _req, googleClient) => {
    const drafts = parsed.drafts as ParsedDrafts;
    const personal = parsed.personal as PersonalInfo;

    const folder = await createFolder({
      googleClient,
      parents: [ADMIN_ESSAY_MICRO_FOLDER],
      folderName: `${personal.firstName} ${personal.lastName}'s Essays`,
    });

    return { message: "Hello World" };
  },
  accountType: AccountType.Admin,
});
