import { ApiResponse } from "../../../_handlers";
import {
  CreatedLeadFields,
  createLead,
} from "../../../_utils/notion/createLead";
import { createInfo, infoContact } from "../../../_utils/generator/info";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { SignatureTypes, webhookHandler } from "../../../_handlers/webhook";
import { getFieldValue, withEndpoint } from "~/app/api/helpers";
import { leadHelpers, updateLead } from "~/app/api/_utils/notion/updateLead";
import { oauthHandler } from "~/app/api/_handlers/oauth";
import { createStudentFolder } from "~/app/api/_utils/drive/createFolder";

// using accelerator registration tally webhook
export const POST = oauthHandler<CreatedLead>({
  type: SignatureTypes.Tally, // tally webhook
  useRedirect: false, // client facing, so don't redirect for oauth
  required: { body: ["data.fields"] },
  handler: async (utilContext: any, _req: NextRequest, googleClient: any) => {
    const { "data.fields": fields } = utilContext;
    // create lead in notion
    const leadFields = parseTallyC1Registration(fields);
    const lead = await createLead(leadFields);
    const info = await createInfo(leadFields["Student Name"], lead.id);

    // no need to await the rest
    updateLead(lead.id, {
      ...leadHelpers.setInfoId(info.infoId),
    });
    createStudentFolder({
      googleClient,
      lead: {
        leadRef: lead.id,
        name: leadFields["Student Name"],
        studentEmail: leadFields["Student's Email"],
        parentEmail: leadFields["Parent's Email"],
      },
    });

    // create contact page in info table
    infoContact({
      infoId: info.infoId, // see express server for output shape, src/routes/info/create.ts
      studentName: leadFields["Student Name"],
      studentEmail: leadFields["Student's Email"],
      studentPhone: leadFields["Student's Phone"],
      parentName: leadFields["Parent Name"],
      parentEmail: leadFields["Parent's Email"],
      parentPhone: leadFields["Parent's Phone"],
    });

    return lead;
  },
});
type CreatedLead = Awaited<ReturnType<typeof createLead>>;

const parseTallyC1Registration = (fields: any): CreatedLeadFields => {
  const gfv = (label: string) => getFieldValue(label, fields);

  return {
    "Student Name": `${gfv("student_first_name")} ${gfv("student_last_name")}`,
    Grade: gfv("Current Grade Level"),
    Major: gfv("major"),
    School: `${gfv("school")}, ${gfv("state")}`,
    id: gfv("id"),
    "Parent Name": `${gfv("parent_first_name")} ${gfv("parent_last_name")}`,
    "Student's Email": gfv("student_email"),
    "Student's Phone": gfv("student_number"),
    "Parent's Email": gfv("parent_email"),
    "Parent's Phone": gfv("parent_number"),
    Origin: gfv("origin").split(", "),
  };
};
