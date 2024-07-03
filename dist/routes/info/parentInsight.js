"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parentInsight = void 0;
const helpers_1 = require("../helpers");
const clients_1 = require("../../clients");
const studentInfo_1 = require("../../utils/studentInfo");
exports.parentInsight = (0, helpers_1.asyncHandler)(async (req, res) => {
    const validatedParams = (0, helpers_1.checkBodyParams)(req, [
        "studentName",
        "infoId",
        "time",
        "whyNow",
        "programFit",
        "programSupport",
    ]);
    if (!validatedParams.isValid)
        return res.status(400).json({
            message: validatedParams.error,
        });
    await parentInsightInDatabase(validatedParams.params);
    return res.json({
        message: "Parent Insight Info - Generated",
    });
});
const parentInsightInDatabase = async ({ studentName, infoId, time, whyNow, programFit, programSupport, }) => {
    const keyMap = new Map();
    const page = await clients_1.notionClient.pages.create((0, studentInfo_1.createInfoPageProps)({
        studentName,
        infoId,
        time,
        infoName: "Parent Insight Response",
        emoji: "🔗",
    }));
    const supports = programSupport.split(",").map((support) => ({
        bulleted_list_item: {
            rich_text: [
                {
                    type: "text",
                    text: {
                        content: support,
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
        },
    }));
    let res = await clients_1.notionClient.blocks.children.append({
        block_id: page.id,
        children: [
            {
                heading_2: {
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content: "Why Now?",
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
                paragraph: {
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content: whyNow,
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
                    color: "default",
                },
            },
            {
                heading_2: {
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content: "Program Fit",
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
                paragraph: {
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content: programFit,
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
                    color: "default",
                },
            },
            {
                heading_2: {
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content: "Program Support",
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
            // notion typing lazy fix
            // @ts-ignore
            ...supports,
            // @ts-ignore
            {
                paragraph: {
                    rich_text: [],
                    color: "default",
                },
            },
            // @ts-ignore
            {
                paragraph: {
                    rich_text: [],
                    color: "default",
                },
            },
        ],
    });
    keyMap.set("c4fc5284367a45519d15c9a0bad9f8bd", res.results);
};
