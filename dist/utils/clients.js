"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.openaiClient = exports.notionClient = void 0;
const client_1 = require("@notionhq/client");
const openai_1 = __importDefault(require("openai"));
exports.notionClient = new client_1.Client({
    auth: process.env.NOTION_API_KEY,
});
exports.openaiClient = new openai_1.default({
    organization: process.env.OPENAI_ORGANIZATION,
    project: process.env.OPENAI_PROJECT,
    apiKey: process.env.OPENAI_API_KEY,
});
