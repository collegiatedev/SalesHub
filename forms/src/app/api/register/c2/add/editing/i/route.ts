import { tallyInputHandler } from "~/app/api/_handlers/input";
import { getFieldValue, fieldToArray } from "~/app/api/helpers";

// using Essay Editing Concentration tally form
export type TallyEditing = {
  id: string;
  which: string;
  prompt: string;
  urls: string[];
};
const parseTallyEditing = (fields: unknown): TallyEditing => {
  const gfv = (label: string) => getFieldValue(label, fields);
  if (!gfv("id")) throw new Error("no student id");

  return {
    id: gfv("id"),
    which: gfv("which app"),
    prompt: gfv("essay prompt"),
    urls: fieldToArray(gfv("upload")), // should be singular file, enforced by tally upload
  };
};

export const POST = tallyInputHandler({
  route: "/api/register/c2/add/editing/d",
  parser: parseTallyEditing,
});
