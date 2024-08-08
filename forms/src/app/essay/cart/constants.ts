// constants, types, helpers for consts

export const ESSAY_TYPES = [
  "Common App / Coalition",
  "Supplemental Essay",
  "Letter of Continued Interest",
] as const;
export const IS_SUPPLEMENTAL = (t: string | undefined) =>
  t === "Supplemental Essay";
export const IS_LETTER = (t: string | undefined) =>
  t === "Letter of Continued Interest";

export const WORD_COUNT_TYPES = ["<250", "250-500", ">500"] as const;
export type EssayType = (typeof ESSAY_TYPES)[number];
export type WordCountType = (typeof WORD_COUNT_TYPES)[number];
