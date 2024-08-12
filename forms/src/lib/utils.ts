import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { SearchParams, SESSION_QUERY_KEY } from "~/app/constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Utility function to deeply merge objects
// used to deeply merge drafts, see store.ts
export function deepMerge(target: any, source: any) {
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object && key in target) {
      Object.assign(source[key], deepMerge(target[key], source[key]));
    }
  }
  Object.assign(target || {}, source);
  return target;
}

// wierdly, this function cannot be in the session.tsx file
export const getSessionId = (searchParams?: SearchParams) => {
  return searchParams?.[SESSION_QUERY_KEY] as string | undefined;
};
