import { HandlerTypes, outputHandler } from "~/app/api/_handlers/output";
import { withFiles } from "~/app/api/_utils/download";
import { createTemplate } from "~/app/api/_utils/drive/createTemplate";
import { uploadFile } from "~/app/api/_utils/drive/uploadFile";
import { EssayTaskParams } from "~/app/api/_utils/generator/essayTasks";
import { getLead, LeadFields } from "~/app/api/_utils/notion/getLead";
import { getRep, RepFields } from "~/app/api/_utils/notion/getRep";
import { ESSAY_DOC_TEMPLATE, redis } from "~/app/api/constants";
import { TallyEditing } from "../i/route";

export const POST = outputHandler<TallyEditing>({
  type: HandlerTypes.OAuth,
  handler: async (input, googleClient) => {
    const lead = await getLead(input.id);
    if (!lead.pageRefs.leadRep) throw new Error("invalid lead");

    const rep = await getRep({ pageId: lead.pageRefs.leadRep });

    await withFiles({
      urls: input.urls,
      processDownloads: async (files) => {
        const file = files[0];
        if (!file) throw new Error("no file");

        const { webViewLink: fileLink } = (await uploadFile({
          googleClient,
          file,
        })) as { webViewLink: string }; // cast to avoid type error

        const { webViewLink: docLink } = (await createTemplate({
          googleClient,
          templateId: ESSAY_DOC_TEMPLATE,
          folderId: lead.otherRefs.folderRef as string,
          ...configEssayTemplate({ lead, input, fileLink }),
        })) as { webViewLink: string }; // cast to avoid type error

        const essayTasks = formatEssayTasks({ rep, lead, fileLink, docLink });
        // temp store in redis, gets called in main route
        await redis.set(lead.id, essayTasks);
      },
    });
    return input;
  },
});

interface FormatEssayParams {
  lead: LeadFields;
  input: TallyEditing;
  fileLink: string;
}
const configEssayTemplate = ({ lead, input, fileLink }: FormatEssayParams) => ({
  title: `${lead.name}'s v1 - ${input.which}`,
  content: [
    {
      variable: "prompt",
      text: input.prompt,
    },
    {
      variable: "file_link",
      text: fileLink,
    },
  ],
});

interface FormatEssayTasks {
  rep: RepFields;
  lead: LeadFields;
  docLink: string;
  fileLink: string;
}
const formatEssayTasks = ({
  rep,
  lead,
  docLink,
  fileLink,
}: FormatEssayTasks) => {
  const essayTasks = {
    leadRepId: rep.id,
    repName: rep.name,
    repPageId: rep.pageId,
    studentName: lead.name,
    studentId: lead.id,
    studentPageId: lead.pageId,
    docLink,
    fileLink,
  } as EssayTaskParams;
  return essayTasks; // missing time, which is added during cal call
};
