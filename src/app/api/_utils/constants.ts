import { Client } from "@notionhq/client";

export const notionClient = new Client({
  auth: process.env.NOTION_API_KEY,
});

export const LEAD_DATABASE_ID = "27386326248f4dae9374811627be3036";

export const SERVER_URL = "https://king-prawn-app-onivj.ondigitalocean.app";
