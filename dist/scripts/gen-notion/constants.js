"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PARENT_ID_PLACEHOLDER = exports.TEMPLATE_DIRECTORY = exports.CHILDREN_DIRECTORY = exports.HEADING_DIRECTORY = exports.notion = void 0;
const client_1 = require("@notionhq/client");
exports.notion = new client_1.Client({
    auth: process.env.NOTION_API_KEY_READONLY,
});
exports.HEADING_DIRECTORY = "src/output/heading/";
exports.CHILDREN_DIRECTORY = "src/output/children/";
exports.TEMPLATE_DIRECTORY = "src/templates/";
exports.PARENT_ID_PLACEHOLDER = "<*>";
