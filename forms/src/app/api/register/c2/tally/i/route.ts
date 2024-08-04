import { tallyInputHandler } from "~/app/api/_handlers/input";
import { C2Form, OptionalC2Form } from "~/app/api/_utils/generator/info";
import { getFieldValue } from "~/app/api/helpers";

// using academic background tally form
export type TallyC2 = C2Form &
  OptionalC2Form & {
    id: string;
  };
const parseTallyC2 = (fields: unknown): TallyC2 => {
  const gfv = (label: string) => getFieldValue(label, fields);
  if (!gfv("id")) throw new Error("no student id");

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

export const POST = tallyInputHandler({
  route: "/api/register/c2/tally",
  parser: parseTallyC2,
});
