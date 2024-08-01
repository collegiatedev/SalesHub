import { docs_v1, google } from "googleapis";
import { GoogleAPI } from "./types";
import { updatePerms } from "./updatePerms";

type TemplateParams = {
  variable: string;
  text: string;
};
interface CreateTemplateParams extends CopyTemplateParams {
  shareWith: string[];
  content: TemplateParams[];
}
export const createTemplate = async ({
  googleClient,
  content,
  title,
  templateId,
  shareWith,
}: CreateTemplateParams) => {
  const withTemplate = ({ variable, text }: TemplateParams) =>
    ({
      replaceAllText: {
        containsText: {
          text: `{{${variable}}}`, // assume all variables are formatted with {{}}
          matchCase: true,
        },
        replaceText: text,
      },
    } as docs_v1.Schema$Request);

  const requests = content.map(withTemplate);
  const documentId = (await copyTemplate({
    googleClient,
    templateId,
    title,
  })) as string;

  await Promise.all([
    updateTemplate({
      googleClient,
      documentId,
      requests,
    }),
    updatePerms({
      googleClient,
      fileId: documentId,
      shareWith,
    }),
  ]);
};

type CopyTemplateParams = {
  templateId: string;
  title: string;
} & GoogleAPI;
const copyTemplate = async ({
  googleClient,
  templateId,
  title,
}: CopyTemplateParams) => {
  const drive = google.drive({ version: "v3", auth: googleClient });
  const res = await drive.files.copy({
    fileId: templateId,
    requestBody: {
      name: title,
    },
  });
  return res.data.id;
};

type UpdateTemplateParams = {
  documentId: string;
  requests: docs_v1.Schema$Request[];
} & GoogleAPI;
const updateTemplate = async ({
  googleClient,
  documentId,
  requests,
}: UpdateTemplateParams) => {
  const docs = google.docs({ version: "v1", auth: googleClient });
  return await docs.documents.batchUpdate({
    documentId,
    requestBody: {
      requests,
    },
  });
};
