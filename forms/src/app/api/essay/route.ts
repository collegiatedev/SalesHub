import { Draft, ParsedDrafts } from "~/app/constants";
import { PersonalInfo } from "~/app/essay/cart/personal";
import { createFolder } from "../_utils/drive/createFolder";
import { ADMIN_ESSAY_MICRO_FOLDER, MICRO_ESSAY_TEMPLATE } from "../constants";
import { createTemplate } from "../_utils/drive/createTemplate";
import { HandlerTypes, outputHandler } from "../_handlers/output";
import { SuccessfulPurchaseInput } from "./success/route";

// create essay, then notify admin on discord
// need to clean this
export const POST = outputHandler<SuccessfulPurchaseInput>({
  type: HandlerTypes.OAuth_Admin,
  handler: async ({ drafts, personal }, googleClient) => {
    const folderId = await createFolder({
      googleClient,
      parents: [ADMIN_ESSAY_MICRO_FOLDER],
      folderName: `${personal.firstName} ${personal.lastName}'s Essays`,
    });

    const createDrafts = drafts.map(([_id, draft]) =>
      createTemplate({
        googleClient,
        folderId,
        templateId: MICRO_ESSAY_TEMPLATE,
        ...configMicroEssay({ personal, draft }),
      })
    );
    await Promise.all(createDrafts);
  },
});

interface FormatMicroEssayParams {
  personal: PersonalInfo;
  draft: Draft;
}
const configMicroEssay = ({ personal, draft }: FormatMicroEssayParams) => {
  const uni = draft.type.university
    ? ` - School: ${draft.type.university}`
    : "";
  const wc = draft.type.wordCount
    ? ` - Word Count: ${draft.type.wordCount}`
    : "";
  const typeText = `${draft.type.essay}${uni}${wc}`;
  const notesText = draft.questions.notes
    ? `Notes: ${draft.questions.notes}`
    : "";

  return {
    title: `${personal.firstName} - ${draft.title}`,
    content: [
      {
        variable: "student_name",
        text: `${personal.firstName} ${personal.lastName}`,
      },
      {
        variable: "email",
        text: personal.email,
      },
      {
        variable: "type",
        text: typeText as string,
      },
      {
        variable: "notes",
        text: notesText as string,
      },
      {
        variable: "prompt",
        text: draft.questions.prompt as string,
      },
      {
        variable: "essay",
        text: draft.questions.submission as string,
      },
    ],
  };
};
