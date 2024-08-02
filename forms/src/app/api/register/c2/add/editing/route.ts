import { drive_v3 } from "googleapis";
import { HandlerTypes, outputHandler } from "~/app/api/_handlers/output";
import { withFiles } from "~/app/api/_utils/download";
import { createTemplate } from "~/app/api/_utils/drive/createTemplate";
import { uploadFile } from "~/app/api/_utils/drive/uploadFile";
import {
  EssayTaskParams,
  essayTasks,
} from "~/app/api/_utils/generator/essayTasks";
import { getLead, LeadFields } from "~/app/api/_utils/notion/getLead";
import { getRep } from "~/app/api/_utils/notion/getRep";
import { ESSAY_DOC_TEMP, redis } from "~/app/api/constants";
import { getFieldValue, urlsFromField } from "~/app/api/helpers";

export const POST = outputHandler<any>({
  type: HandlerTypes.OAuth,
  handler: async (input, googleClient) => {
    const response = parseTallyEditing(input);
    if (!response.id) throw new Error("no student id");

    const lead = await getLead(response.id);
    if (!lead.pageRefs.leadRep) throw new Error("invalid lead");

    const rep = await getRep({ pageId: lead.pageRefs.leadRep });

    await withFiles({
      urls: response.urls,
      processDownloads: async (files) => {
        const file = files[0];
        if (!file) throw new Error("no file");

        const upload = await uploadFile({ googleClient, file });

        const template = await createTemplate({
          ...formatEssayTemplate({ lead, response, upload }),
          googleClient,
        });

        const essayTask: EssayTaskParams = {
          leadRepId: rep.id,
          repName: rep.name,
          repPageId: rep.pageId,
          studentName: lead.name,
          studentId: lead.id,
          studentPageId: lead.pageId,
          docLink: template.webViewLink as string,
          fileLink: upload.webViewLink as string,
          time: "", // will be updated by actual task call
        };

        await redis.set(lead.id, JSON.stringify(essayTask));

        // save somewhere else
        // await essayTasks(save);
      },
    });
    return input;
  },
});

interface FormatEssayParams {
  lead: LeadFields;
  response: TallyEditing;
  upload: drive_v3.Schema$File;
}
const formatEssayTemplate = ({
  lead,
  response,
  upload,
}: FormatEssayParams) => ({
  templateId: ESSAY_DOC_TEMP,
  title: `${lead.name}'s v1 - ${response.which}`,
  content: [
    {
      variable: "prompt",
      text: response.prompt,
    },
    {
      variable: "file_link",
      text: upload.webViewLink as string,
    },
  ],
});

type TallyEditing = {
  id: string;
  which: string;
  prompt: string;
  urls: string[];
};
const parseTallyEditing = (fields: any): TallyEditing => {
  const gfv = (label: string) => getFieldValue(label, fields);

  return {
    id: gfv("id"),
    which: gfv("which app"),
    prompt: gfv("essay prompt"),
    urls: urlsFromField(gfv("upload")), // should be singular file, enforced by tally upload
  };
};
