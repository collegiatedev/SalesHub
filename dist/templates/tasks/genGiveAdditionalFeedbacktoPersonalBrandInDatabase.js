"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genGiveAdditionalFeedbacktoPersonalBrandInDatabase = void 0;
const constants_1 = require("../../utils/constants");
const clients_1 = require("../../utils/clients");
const shared_1 = require("../utils/shared");
const genGiveAdditionalFeedbacktoPersonalBrandInDatabase = async ({ studentName, studentPageId, repPageId, pbDocLink, studentDashboardPageId, }) => {
    const keyMap = new Map();
    const page = await clients_1.notionClient.pages.create({
        parent: {
            type: "database_id",
            database_id: constants_1.ACCELERATOR_TASKS_DB,
        },
        icon: {
            type: "emoji",
            emoji: "🎨",
        },
        properties: {
            ...(0, shared_1.addTaskProperties)({
                studentName,
                studentPageId,
                repPageId,
                taskName: "Give Additional Feedback to Personal Brand",
                taskId: constants_1.GIVE_ADDITIONAL_FEEDBACK_TO_PB_TASK,
            }),
        },
    });
    let res = await clients_1.notionClient.blocks.children.append({
        block_id: page.id,
        children: [
            {
                heading_1: {
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content: "Tasks",
                                link: null,
                            },
                            annotations: {
                                bold: false,
                                italic: false,
                                strikethrough: false,
                                underline: false,
                                code: false,
                                color: "default",
                            },
                        },
                    ],
                    is_toggleable: false,
                    color: "default",
                },
            },
            {
                to_do: {
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content: "Leave ",
                                link: null,
                            },
                            annotations: {
                                bold: false,
                                italic: false,
                                strikethrough: false,
                                underline: false,
                                code: false,
                                color: "default",
                            },
                        },
                        {
                            type: "text",
                            text: {
                                content: "4-5 comments per category",
                                link: null,
                            },
                            annotations: {
                                bold: true,
                                italic: false,
                                strikethrough: false,
                                underline: false,
                                code: false,
                                color: "default",
                            },
                        },
                        {
                            type: "text",
                            text: {
                                content: " (~20 total) via ",
                                link: null,
                            },
                            annotations: {
                                bold: false,
                                italic: false,
                                strikethrough: false,
                                underline: false,
                                code: false,
                                color: "default",
                            },
                        },
                        {
                            type: "mention",
                            mention: {
                                page: {
                                    id: "55daf4db-3278-43c6-9618-01ef002ff616",
                                },
                            },
                            annotations: {
                                bold: false,
                                italic: false,
                                strikethrough: false,
                                underline: false,
                                code: false,
                                color: "default",
                            },
                        },
                        {
                            type: "text",
                            text: {
                                content: " ",
                                link: null,
                            },
                            annotations: {
                                bold: false,
                                italic: false,
                                strikethrough: false,
                                underline: false,
                                code: false,
                                color: "default",
                            },
                        },
                    ],
                    checked: false,
                    color: "default",
                },
            },
            {
                to_do: {
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content: "Link the ",
                                link: null,
                            },
                            annotations: {
                                bold: false,
                                italic: false,
                                strikethrough: false,
                                underline: false,
                                code: false,
                                color: "default",
                            },
                        },
                        {
                            type: "mention",
                            mention: {
                                page: {
                                    id: "db61bc61120b41479894b6da15d9ee69",
                                },
                            },
                            annotations: {
                                bold: false,
                                italic: false,
                                strikethrough: false,
                                underline: false,
                                code: false,
                                color: "default",
                            },
                        },
                        {
                            type: "text",
                            text: {
                                content: " (type ‘@Exemplar Personal Brand’) into ",
                                link: null,
                            },
                            annotations: {
                                bold: false,
                                italic: false,
                                strikethrough: false,
                                underline: false,
                                code: false,
                                color: "default",
                            },
                        },
                        {
                            type: "mention",
                            mention: {
                                database: {
                                    id: studentDashboardPageId,
                                },
                            },
                            annotations: {
                                bold: false,
                                italic: false,
                                strikethrough: false,
                                underline: false,
                                code: false,
                                color: "default",
                            },
                        },
                        {
                            type: "text",
                            text: {
                                content: " under the Resources section",
                                link: null,
                            },
                            annotations: {
                                bold: false,
                                italic: false,
                                strikethrough: false,
                                underline: false,
                                code: false,
                                color: "default",
                            },
                        },
                    ],
                    checked: false,
                    color: "default",
                },
            },
        ],
    });
    keyMap.set("63c03a42c94d4d38b30835434dd22e01", res.results);
    let promises = [];
    promises.push((async () => {
        const res = await clients_1.notionClient.blocks.children.append({
            block_id: keyMap.get("63c03a42c94d4d38b30835434dd22e01")[1].id,
            children: [
                {
                    bookmark: {
                        caption: [],
                        url: pbDocLink,
                    },
                },
            ],
        });
        keyMap.set("3df7cc04-0a02-46fd-9199-929fcae10288", res.results);
        console.log("Created: 3df7cc04-0a02-46fd-9199-929fcae10288");
    })());
    await Promise.all(promises);
    console.log("Done with batch");
    promises = [];
};
exports.genGiveAdditionalFeedbacktoPersonalBrandInDatabase = genGiveAdditionalFeedbacktoPersonalBrandInDatabase;
