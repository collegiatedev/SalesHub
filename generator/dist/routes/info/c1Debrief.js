"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postC1DebriefInDatabase = exports.c1Debrief = void 0;
const helpers_1 = require("../helpers");
const clients_1 = require("../../clients");
const studentInfo_1 = require("../../utils/studentInfo");
exports.c1Debrief = (0, helpers_1.asyncHandler)(async (req, res) => {
    const validatedParams = (0, helpers_1.checkBodyParams)(req, [
        "studentName",
        "infoId",
        "activities",
        "pronunciation",
        "pronouns",
        "intended",
        "plans",
        "profile",
        "additional",
    ]);
    if (!validatedParams.isValid)
        return res.status(400).json({
            message: validatedParams.error,
        });
    await (0, exports.postC1DebriefInDatabase)(validatedParams.params);
    return res.json({
        message: "Post-C1 Debrief Info - Generated",
    });
});
const postC1DebriefInDatabase = async ({ studentName, infoId, activities, pronunciation, pronouns, intended, plans, profile, additional, }) => {
    const keyMap = new Map();
    const page = await clients_1.notionClient.pages.create((0, studentInfo_1.createInfoPageProps)({
        studentName,
        infoId,
        infoName: "Post-C1 Debrief",
        emoji: "1️⃣",
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
                                content: "Name",
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
                    is_toggleable: true,
                    color: "default",
                },
            },
            {
                heading_2: {
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content: "EC/Activity Analysis",
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
                    is_toggleable: true,
                    color: "default",
                },
            },
            {
                heading_2: {
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content: "Profile Analysis",
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
                    is_toggleable: true,
                    color: "default",
                },
            },
            {
                heading_2: {
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content: "Summer/Winter Plans",
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
                    is_toggleable: true,
                    color: "default",
                },
            },
            {
                heading_2: {
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content: "Else",
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
                    is_toggleable: true,
                    color: "default",
                },
            },
        ],
    });
    keyMap.set("22f0e49346f4401994d1a532bac9c303", res.results);
    let promises = [];
    promises.push((async () => {
        const res = await clients_1.notionClient.blocks.children.append({
            block_id: keyMap.get("22f0e49346f4401994d1a532bac9c303")[1].id,
            children: [
                {
                    paragraph: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: activities,
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
        keyMap.set("0c58594e-7e5a-4239-b338-01b88d5aa883", res.results);
        console.log("Created: 0c58594e-7e5a-4239-b338-01b88d5aa883");
    })());
    promises.push((async () => {
        const res = await clients_1.notionClient.blocks.children.append({
            block_id: keyMap.get("22f0e49346f4401994d1a532bac9c303")[0].id,
            children: [
                {
                    heading_3: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Pronunciation",
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
                                    content: pronunciation,
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
                                    content: "Pronouns",
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
                                    content: pronouns,
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
                                    content: "Intended Major/Career Interest",
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
                                    content: intended,
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
        keyMap.set("30c55fb7-57a9-4582-8cdb-1748941579fb", res.results);
        console.log("Created: 30c55fb7-57a9-4582-8cdb-1748941579fb");
    })());
    promises.push((async () => {
        const res = await clients_1.notionClient.blocks.children.append({
            block_id: keyMap.get("22f0e49346f4401994d1a532bac9c303")[3].id,
            children: [
                {
                    paragraph: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: plans,
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
        keyMap.set("44145c96-26be-49b0-b706-3cf7c20db9b4", res.results);
        console.log("Created: 44145c96-26be-49b0-b706-3cf7c20db9b4");
    })());
    promises.push((async () => {
        const res = await clients_1.notionClient.blocks.children.append({
            block_id: keyMap.get("22f0e49346f4401994d1a532bac9c303")[2].id,
            children: [
                {
                    paragraph: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: profile,
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
        keyMap.set("a474e3ff-96cc-4136-91b4-9538ca9886aa", res.results);
        console.log("Created: a474e3ff-96cc-4136-91b4-9538ca9886aa");
    })());
    promises.push((async () => {
        const res = await clients_1.notionClient.blocks.children.append({
            block_id: keyMap.get("22f0e49346f4401994d1a532bac9c303")[4].id,
            children: [
                {
                    paragraph: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: additional,
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
        keyMap.set("a671eb1e-75cc-4619-9d08-e8fec4df2cdf", res.results);
        console.log("Created: a671eb1e-75cc-4619-9d08-e8fec4df2cdf");
    })());
    await Promise.all(promises);
    console.log("Done with batch");
    promises = [];
};
exports.postC1DebriefInDatabase = postC1DebriefInDatabase;
