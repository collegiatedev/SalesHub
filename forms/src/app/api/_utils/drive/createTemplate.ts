import { docs_v1, google } from "googleapis";
import { GoogleAPI } from "../../types";
import { updatePerms } from "./updatePerms";

type TemplateParams = {
  variable: string;
  text: string;
};
interface CreateTemplateParams extends CopyTemplateParams {
  shareWith?: string[];
  content?: TemplateParams[];
  folderId: string; // Added folderId to specify the folder where the template will be created
}

// adjust typing to make this more explict
// rather than drive_v3.Schema$File just type cast it
export const createTemplate = async ({
  googleClient,
  content = [],
  title,
  folderId,
  templateId,
  shareWith = [],
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
  const template = await copyTemplate({
    folderId,
    googleClient,
    templateId,
    title,
  });
  const documentId = template.id as string;

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
  return template;
};

type CopyTemplateParams = {
  templateId: string;
  title: string;
  folderId: string; // Added folderId to specify the folder where the template will be created
} & GoogleAPI;
const copyTemplate = async ({
  googleClient,
  templateId,
  title,
  folderId,
}: CopyTemplateParams) => {
  const drive = google.drive({ version: "v3", auth: googleClient });
  const res = await drive.files.copy({
    fileId: templateId,
    requestBody: {
      name: title,
      parents: [folderId], // Specify the folder where the template will be created
    },
    fields: "id, name, webViewLink",
  });
  return res.data;
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
