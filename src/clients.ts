"dotenv/config";

import { Client } from "@notionhq/client";

export const notionClient = new Client({
  auth: process.env.NOTION_API_KEY,
});

export const notionReadOnlyClient = new Client({
  auth: process.env.NOTION_API_KEY_READONLY,
});
