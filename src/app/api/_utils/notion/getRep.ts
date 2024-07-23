import { notionClient, REP_DATABASE_ID } from "../../constants";

export const getRep = async (repId: string) => {
  const response = await notionClient.databases.query({
    database_id: REP_DATABASE_ID,
    page_size: 1,
    filter: {
      property: "cal id",
      rich_text: {
        equals: repId,
      },
    },
  });

  // need to text number if no id error
  if (response.results.length === 0) throw new Error(`Invalid ID: ${repId}`);

  return parseRepResponse(
    // @ts-ignore
    // notion's response is not typed correctly
    response.results[0].properties,
    response.results[0]!.id
  );
};

// might need to extend, once cal links are added
const parseRepResponse = (properties: any, pageId: string): RepFields => {
  return {
    pageId,
    id: properties["cal id"].rich_text[0].plain_text,
    name: properties["Name"].title[0].plain_text,
  };
};
type RepFields = {
  id: string;
  pageId: string;
  name: string;
};
