import { getFieldValue } from "~/app/api/helpers";
import { HandlerTypes, outputHandler } from "~/app/api/_handlers/io";
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
    if (!lead || !lead.otherRefs.folderRef) throw new Error("invalid lead");

    await backgroundInfo({
      ...response,
      studentName: lead.name,
      infoId: lead.otherRefs.dbRef,
    });

    return response;
  },
});

const parseTallyC2 = (fields: any): any => {
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
  } as C2Form & OptionalC2Form;
};
