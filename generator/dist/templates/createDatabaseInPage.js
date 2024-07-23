"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clients_1 = require("../utils/clients");
const createDatabaseInPage = async ({ name, pageId, }) => {
    const response = await clients_1.notionClient.databases.create({
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
    await clients_1.notionClient.pages.update({
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
