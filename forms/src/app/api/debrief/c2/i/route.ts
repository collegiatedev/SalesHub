import { tallyInputHandler } from "~/app/api/_handlers/input";
import { getFieldValue } from "~/app/api/helpers";

// using c2 debfrief form
export type C2Debrief = {
  id: string;
  type: string;
  leadRepId: string;
  challenges: string;
  value: string;
  alternatives: string;
};
const parseTallyC2Debrief = (fields: unknown): C2Debrief => {
  const gfv = (label: string) => getFieldValue(label, fields);
  if (!gfv("id")) throw new Error("no rep id");
  return {
    id: gfv("id"), // student id
    leadRepId: gfv("leadRepId"), // actual lead rep
    type: gfv("type"), // c2 module type
    challenges: gfv("challenges"),
    alternatives: gfv("alternatives"),
    value: gfv("value"),
  };
};

export const POST = tallyInputHandler({
  route: "/api/debrief/c2",
  parser: parseTallyC2Debrief,
});
