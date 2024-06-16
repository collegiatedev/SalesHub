import { Client } from "@notionhq/client";

export const notion = new Client({
  auth: process.env.NOTION_API_KEY_READONLY,
});

export const HEADING_DIRECTORY = "src/output/heading/";
export const CHILDREN_DIRECTORY = "src/output/children/";
export const TEMPLATE_DIRECTORY = "src/templates/";

export const PARENT_ID_PLACEHOLDER = "<*>";
