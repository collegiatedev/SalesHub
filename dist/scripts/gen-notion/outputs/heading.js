"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.outputPageHeading = exports.outputDatabaseHeading = void 0;
const constants_1 = require("../constants");
const create_1 = require("./create");
const outputDatabaseHeading = async (pageId) => {
    const page = await constants_1.notion.pages.retrieve({ page_id: pageId });
    await (0, create_1.deleteDirectoryIfExists)(constants_1.HEADING_DIRECTORY + pageId);
    // notion heading data shape >:(
    const heading = {
        parent: {
            type: "database_id",
            database_id: constants_1.PARENT_ID_PLACEHOLDER,
        },
        icon: page.icon,
        properties: {
            Name: {
                title: [
                    {
                        text: {
                            content: page.properties.Name.title[0].plain_text,
                        },
                    },
                ],
            },
        },
    };
    await (0, create_1.createOutput)({
        pageId,
        directory: constants_1.HEADING_DIRECTORY,
        content: heading,
        subfolder: false,
    });
};
exports.outputDatabaseHeading = outputDatabaseHeading;
const outputPageHeading = async (pageId) => {
    const page = await constants_1.notion.pages.retrieve({ page_id: pageId });
    await (0, create_1.deleteDirectoryIfExists)(constants_1.HEADING_DIRECTORY + pageId);
    // notion heading data shape >:(
    const heading = {
        parent: {
            type: "page_id",
            page_id: constants_1.PARENT_ID_PLACEHOLDER, // special placeholder for pageId
        },
        icon: page.icon,
        properties: {
            title: [
                {
                    text: {
                        content: page.properties.Name.title[0].plain_text, // only works for db pages wtf
                    },
                },
            ],
        },
    };
    await (0, create_1.createOutput)({
        pageId,
        directory: constants_1.HEADING_DIRECTORY,
        content: heading,
        subfolder: false,
    });
};
exports.outputPageHeading = outputPageHeading;
