"use strict";
"dotenv/config";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notionReadOnlyClient = exports.notionClient = void 0;
const client_1 = require("@notionhq/client");
exports.notionClient = new client_1.Client({
    auth: process.env.NOTION_API_KEY,
});
exports.notionReadOnlyClient = new client_1.Client({
    auth: process.env.NOTION_API_KEY_READONLY,
});
