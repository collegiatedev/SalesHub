import { ApiResponse } from "../../../_handlers";
import {
  CreatedLeadFields,
  createLead,
} from "../../../_utils/notion/createLead";
import { createInfo, infoContact } from "../../../_utils/generator/info";
import { NextRequest } from "next/server";
import axios from "axios";
import { SignatureTypes, webhookHandler } from "../../../_handlers/webhook";
import { getFieldValue } from "~/app/api/helpers";

// using accelerator registration tally webhook
export const POST = webhookHandler<CreatedFields>({
  required: { body: ["data.fields"] },
  handler: async (utilContext: any, req: NextRequest) => {
    const { "data.fields": fields } = utilContext;
    // create lead in notion
    const leadFields = parseTallyC1Registration(fields);
    const lead = await createLead(leadFields);

    // create google drive folder via seperate endpoint
    const driveEndpoint = new URL("/api/register/c1/drive", req.url);
    await axios.post(driveEndpoint.toString(), {
      leadRef: lead.id,
      name: leadFields["Student Name"],
      studentEmail: leadFields["Student's Email"],
      parentEmail: leadFields["Parent's Email"],
    });

    // call info/create and info/contact server endpoints
    const info = await createInfo(leadFields["Student Name"], lead.id);
    // dont await cuz it takes too long in serverless env
    infoContact({
      infoId: info.infoId, // see express server for output shape, src/routes/info/create.ts
      studentName: leadFields["Student Name"],
      studentEmail: leadFields["Student's Email"],
      studentPhone: leadFields["Student's Phone"],
      parentName: leadFields["Parent Name"],
      parentEmail: leadFields["Parent's Email"],
      parentPhone: leadFields["Parent's Phone"],
    });

    return { lead };
  },
  type: SignatureTypes.Tally,
});

// tally fields -> createLead data shape
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

type CreatedLead = Awaited<ReturnType<typeof createLead>>;
type CreatedFields = {
  lead: CreatedLead;
};

export type HookHandlerResponse = ApiResponse<CreatedFields>;
