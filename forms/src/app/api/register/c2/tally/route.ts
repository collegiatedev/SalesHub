import { getFieldValue } from "~/app/api/helpers";
import { HandlerTypes, outputHandler } from "~/app/api/_handlers/output";
import { getLead } from "~/app/api/_utils/notion/getLead";
import {
  backgroundInfo,
  C2Form,
  OptionalC2Form,
} from "~/app/api/_utils/generator/info";

export const POST = outputHandler<any>({
  type: HandlerTypes.Req,
  handler: async (input) => {
    const response = parseTallyC2(input);
    if (!response.id) throw new Error("no student id");
    const lead = await getLead(response.id);
    if (!lead.otherRefs.dbRef) throw new Error("invalid lead");

    await backgroundInfo({
      ...response,
      studentName: lead.name,
      infoId: lead.otherRefs.dbRef,
    });

    return response;
  },
});

type TallyC2 = C2Form &
  OptionalC2Form & {
    id: string;
  };
const parseTallyC2 = (fields: any): TallyC2 => {
  const gfv = (label: string) => getFieldValue(label, fields);

  return {
    id: gfv("id"),
    uGPA: gfv("uGPA"),
    wGPA: gfv("wGPA"),
    additionalAcademic: gfv("more academic info"),
    additionalActivity: gfv("additional activity info"),
    transcripts: gfv("transcripts"),
    resumePortfolios: gfv("resume or portfolio"),
    professionalLinks: gfv("links"),
  };
};
