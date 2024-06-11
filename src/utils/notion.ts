require("dotenv").config();
const { Client } = require("@notionhq/client");

// Initializing a client
const notionClient = new Client({
  auth: process.env.NOTION_API_KEY,
});

module.exports = notionClient;
