import { Client } from "@notionhq/client";
import OpenAI from "openai";

export const notionClient = new Client({
  auth: process.env.NOTION_API_KEY,
});

export const openaiClient = new OpenAI({
  organization: process.env.OPENAI_ORGANIZATION,
  project: process.env.OPENAI_PROJECT,
  apiKey: process.env.OPENAI_API_KEY,
});
