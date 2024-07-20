import { ApiResponse } from "../../_handlers";
import {
  createLead,
  parseCreateLeadFields,
} from "../../_utils/notion/createLead";
import { createInfo, infoContact } from "../../_utils/axios/info";
import { NextRequest } from "next/server";
import axios from "axios";
import { webhookHandler } from "../../_handlers/webhook";

// using accelerator registration tally webhook
export const POST = webhookHandler<CreatedFields>(
  { body: ["data.fields"] },
  async (utilContext: any, req: NextRequest) => {
    const { "data.fields": fields } = utilContext;
    // create lead in notion
    const leadFields = parseCreateLeadFields(fields);
    const lead = await createLead(leadFields);

    // create google drive folder via seperate endpoint
    const driveEndpoint = new URL("/api/register/drive", req.url);
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
  }
);

type CreatedLead = Awaited<ReturnType<typeof createLead>>;
type CreatedFields = {
  lead: CreatedLead;
};

export type HookHandlerResponse = ApiResponse<CreatedFields>;
