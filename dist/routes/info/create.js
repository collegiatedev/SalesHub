"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInfoDatabaseInPage = exports.create = void 0;
const helpers_1 = require("../helpers");
const clients_1 = require("../../clients");
exports.create = (0, helpers_1.asyncHandler)(async (req, res) => {
    const validatedParams = (0, helpers_1.checkBodyParams)(req, ["name", "pageId"]);
    if (!validatedParams.isValid) {
        return res.status(400).json({
            message: validatedParams.error,
        });
    }
    const infoId = await (0, exports.createInfoDatabaseInPage)(validatedParams.params);
    return res.json({
        message: "Info Table - Generated, Student Page - Updated",
        infoId,
    });
});
const createInfoDatabaseInPage = async ({ name, pageId, }) => {
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
            Time: {
                date: {},
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
    return response.id;
};
exports.createInfoDatabaseInPage = createInfoDatabaseInPage;
