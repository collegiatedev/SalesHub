// types and constants

export type Draft = {
  title: string;
  type?: {
    essay: EssayType;
    wordCount?: WordCountType;
  };
  ready: boolean;
};

export const DEFAULT_DRAFT: Draft = { title: "", ready: false };

export const ESSAY_TYPES = [
  "Common App / Coalition",
  "Supplemental Essay",
  "Letter of Continued Interest",
] as const;
export const WORD_COUNT_TYPES = ["<250", "250-500", ">500"] as const;
export type EssayType = (typeof ESSAY_TYPES)[number];
export type WordCountType = (typeof WORD_COUNT_TYPES)[number];
