import { tallyInputHandler } from "~/app/api/_handlers/input";
import { getFieldValue } from "~/app/api/helpers";

// using c1 debfrief form
export type C1Debrief = {
  id: string;
  pronunciation: string;
  pronouns: string;
  intended: string;
  "ecs/activities": string;
  "why now?": string;
  "summer/winter plans": string;
  additional: string;
};
const parseTallyC1Debrief = (fields: any): C1Debrief => {
  const gfv = (label: string) => getFieldValue(label, fields);
  if (!gfv("id")) throw new Error("no rep id");
  return {
    id: gfv("id"),
    pronunciation: gfv("pronunciation"),
    pronouns: gfv("pronouns"),
    intended: gfv("intended"),
    "ecs/activities": gfv("ecs/activities"),
    "why now?": gfv("why now?"),
    "summer/winter plans": gfv("summer/winter plans"),
    additional: gfv("additional"),
  };
};

export const POST = tallyInputHandler({
  route: "/api/debrief/c1",
  parser: parseTallyC1Debrief,
});
