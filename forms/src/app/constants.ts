// types, constants, sdks, etc
export type NextPageProps = {
  params?: { slug: string };
  searchParams?: SearchParams;
};

export type SearchParams = { [key: string]: string | string[] | undefined };

// ?s=session-id
export const SESSION_QUERY_KEY = "s";
