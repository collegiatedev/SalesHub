// types, constants, etc

export type NextPageProps = {
  params?: { slug: string };
  searchParams?: SearchParams;
};

export type SearchParams = { [key: string]: string | string[] | undefined };

export const SESSION_KEY = "s";
