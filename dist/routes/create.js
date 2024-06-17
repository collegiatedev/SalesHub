"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRouter = void 0;
const express_1 = require("express");
const notion_1 = require("../utils/notion");
exports.createRouter = (0, express_1.Router)();
exports.createRouter.get("/", async (req, res) => {
    try {
        const { pageId, name } = req.query;
        const missingParams = [];
        if (!pageId)
            missingParams.push("pageId");
        if (!name)
            missingParams.push("name");
        if (missingParams.length > 0) {
            return res.status(400).json({
                message: `Missing required parameters: ${missingParams.join(", ")}`,
            });
        }
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
        return res.json({
            message: "table created, page updated",
        });
    }
    catch (error) {
        // Handle any errors that occur
        return res.status(500).json({
            message: "Failed to create meeting",
            error,
        });
    }
});
