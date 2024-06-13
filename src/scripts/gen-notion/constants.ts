import { Client } from "@notionhq/client";

export const notion = new Client({
  auth: process.env.NOTION_API_KEY_READONLY,
});

export const HEADING_DIRECTORY = "src/output/heading/";
export const CONTENT_DIRECTORY = "src/output/content/";
export const REQUEST_DIRECTORY = "src/output/request/";
export const TEMPLATE_DIRECTORY = "src/templates/";
