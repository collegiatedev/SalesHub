// constants, types, helpers
export const isProduction = process.env.VERCEL_ENV === "production";

// stripe product ids; you're actually so fucking dumb... its not prod vs test dawg
export const STRIPE_PUBLIC = isProduction
  ? (process.env.PROD_NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string)
  : (process.env.TEST_NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

// todo, switch to product price ids
export const COMMON_APP_COALITION = "prod_Qd6G1s6NJCE1kG";
export const SUPPLEMENTAL_LT_250 = "prod_Qd6HXH1mbvjY1W";
export const SUPPLEMENTAL_250_500 = "prod_Qd6IGmSZrZnZjT";
export const SUPPLEMENTAL_GT_500 = "prod_Qd6J4oXGfu702p";
export const LETTER_OF_CONTINUED_INTEREST = "prod_Qd6KYcEj5Gq0FU";

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
export type WordCountType = (typeof WORD_COUNT_TYPES)[number]; // root types, constants, clients, etc

export type NextPageProps = {
  params?: { slug: string };
  searchParams?: SearchParams;
};

// ?s=session-id
export type SearchParams = { [key: string]: string | string[] | undefined };

export const SESSION_QUERY_KEY = "s";
// 3 days, in seconds

export const SESSION_EXPIRATION = 259200;

export type CalculatePriceProps = {
  essay?: EssayType;
  wordCount?: WordCountType;
};
