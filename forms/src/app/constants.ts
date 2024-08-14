// constants, types, helpers that are needed in both client and server

export const isProduction = process.env.VERCEL_ENV === "production";
export const NEXT_URL = isProduction
  ? "https://collegiate.dev" // WARNING: DO NOT USE `https://${process.env.VERCEL_URL}`
  : (process.env.NEXT_PUBLIC_NGROK_URL as string);
// : "http://localhost:3000"; // local url

// generator server url
export const SERVER_URL = isProduction
  ? "https://king-prawn-app-onivj.ondigitalocean.app"
  : "http://localhost:8080"; // generator local url

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

export type CalculatePriceProps = {
  essay?: EssayType;
  wordCount?: WordCountType;
};

// refractor away from Partial, safely
export type Draft = {
  title: string;
  type: Partial<{
    essay: EssayType;
    wordCount: WordCountType;
    university: string;
  }>;
  questions: Partial<{
    prompt: string;
    submission: string;
    notes: string;
  }>;
  ready: boolean;
};
export type ParsedDrafts = [number, Draft][];

export const SESSION_QUERY_KEY = "s"; // ?s=session-id
export const SESSION_EXPIRATION = 259200; // 3 days, in seconds

//rather than throwing errors, redirect to error route
export const ERROR_ROUTE = "/essay/?error=true";

export type SearchParams = { [key: string]: string | string[] | undefined };
export type NextPageProps = {
  params?: { slug: string };
  searchParams?: SearchParams;
};
