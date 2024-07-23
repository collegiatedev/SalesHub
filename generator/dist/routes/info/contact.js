"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routers_1 = require("../routers");
const clients_1 = require("../../clients");
const studentInfo_1 = require("../../utils/studentInfo");
routers_1.infoRouter.get("/contact", (0, routers_1.asyncHandler)(async (req, res) => {
    const validatedParams = (0, routers_1.checkBodyParams)(req, [
        "studentName",
        "infoId",
        "time",
        "studentEmail",
        "studentPhone",
        "parentEmail",
        "parentPhone",
        "parentName",
    ]);
    if (!validatedParams.isValid)
        return res.status(400).json({
            message: validatedParams.error,
        });
    await contactInfoInDatabase(validatedParams.params);
    return res.json({
        message: "Contact Info - Generated",
    });
}));
const contactInfoInDatabase = async ({ studentName, infoId, time, studentEmail, studentPhone, parentEmail, parentPhone, parentName, }) => {
    const keyMap = new Map();
    const page = await clients_1.notionClient.pages.create((0, studentInfo_1.createInfoPageProps)({
        studentName,
        infoId,
        time,
        infoName: "Contact Info",
        emoji: "📞",
    }));
    let res = await clients_1.notionClient.blocks.children.append({
        block_id: page.id,
        children: [
            {
                heading_3: {
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content: "Student",
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
                bulleted_list_item: {
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content: `email: ${studentEmail}`,
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
                bulleted_list_item: {
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content: `phone: ${studentPhone}`,
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
                heading_3: {
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content: "Parent",
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
                bulleted_list_item: {
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content: `name: ${parentName}`,
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
                bulleted_list_item: {
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content: `email: ${parentEmail}`,
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
                bulleted_list_item: {
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content: `phone: ${parentPhone}`,
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
        ],
    });
    keyMap.set("1f9f9997ab4441e2a4be000dbc14e9da", res.results);
};
