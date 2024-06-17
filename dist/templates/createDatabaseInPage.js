"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDatabaseInPage = void 0;
const notion_1 = require("../utils/notion");
const createDatabaseInPage = async ({ name, pageId, }) => {
    const response = await notion_1.notion.databases.create({
        parent: {
            type: "page_id",
            page_id: pageId,
        },
        title: [
            {
                type: "text",
                text: {
                    content: `${name}'s Info`,
                    link: null,
                },
            },
        ],
        properties: {
            Name: {
                title: {},
            },
        },
        is_inline: true,
    });
    await notion_1.notion.pages.update({
        page_id: pageId,
        properties: {
            "db-ref": {
                rich_text: [
                    {
                        type: "text",
                        text: {
                            content: response.id,
                        },
                    },
                ],
            },
        },
    });
};
exports.createDatabaseInPage = createDatabaseInPage;
