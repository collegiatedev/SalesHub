"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postC2DebriefInDatabase = void 0;
const routers_1 = require("../routers");
const clients_1 = require("../../clients");
const studentInfo_1 = require("../../utils/studentInfo");
routers_1.infoRouter.get("/c2", (0, routers_1.asyncHandler)(async (req, res) => {
    const validatedParams = (0, routers_1.checkBodyParams)(req, [
        "studentName",
        "infoId",
        "time",
        "repName",
        "type",
        "challenges",
        "value",
        "alternatives",
    ]);
    if (!validatedParams.isValid)
        return res.status(400).json({
            message: validatedParams.error,
        });
    await (0, exports.postC2DebriefInDatabase)(validatedParams.params);
    return res.json({
        message: "Post-C1 Debrief Info - Generated",
    });
}));
const postC2DebriefInDatabase = async ({ studentName, infoId, time, repName, type, challenges, value, alternatives, }) => {
    const keyMap = new Map();
    const page = await clients_1.notionClient.pages.create((0, studentInfo_1.createInfoPageProps)({
        studentName,
        infoId,
        time,
        infoName: "Post-C2 Debrief",
        emoji: "2️⃣",
    }));
    let res = await clients_1.notionClient.blocks.children.append({
        block_id: page.id,
        children: [
            {
                heading_1: {
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content: "Info",
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
                heading_1: {
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content: "Challenges",
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
                heading_1: {
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content: "Value",
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
                heading_1: {
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content: "Alternatives",
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
                paragraph: {
                    rich_text: [],
                    color: "default",
                },
            },
        ],
    });
    keyMap.set("05b3d4ed7ca04d7394fbd117f1129dbe", res.results);
    let promises = [];
    promises.push((async () => {
        const res = await clients_1.notionClient.blocks.children.append({
            block_id: keyMap.get("05b3d4ed7ca04d7394fbd117f1129dbe")[1].id,
            children: [
                {
                    paragraph: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: challenges,
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
        keyMap.set("06d5b98e-024e-43f7-a83c-ae771f2e9375", res.results);
        console.log("Created: 06d5b98e-024e-43f7-a83c-ae771f2e9375");
    })());
    promises.push((async () => {
        const res = await clients_1.notionClient.blocks.children.append({
            block_id: keyMap.get("05b3d4ed7ca04d7394fbd117f1129dbe")[3].id,
            children: [
                {
                    paragraph: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: alternatives,
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
        keyMap.set("0bc3bb26-98b8-43c5-b775-79e08beafd7c", res.results);
        console.log("Created: 0bc3bb26-98b8-43c5-b775-79e08beafd7c");
    })());
    promises.push((async () => {
        const res = await clients_1.notionClient.blocks.children.append({
            block_id: keyMap.get("05b3d4ed7ca04d7394fbd117f1129dbe")[2].id,
            children: [
                {
                    paragraph: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: value,
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
        keyMap.set("183e66fa-80eb-4abd-bff7-97e5948c7c2c", res.results);
        console.log("Created: 183e66fa-80eb-4abd-bff7-97e5948c7c2c");
    })());
    promises.push((async () => {
        const res = await clients_1.notionClient.blocks.children.append({
            block_id: keyMap.get("05b3d4ed7ca04d7394fbd117f1129dbe")[0].id,
            children: [
                {
                    paragraph: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: `Module Type: ${type}`,
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
                    paragraph: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: `Meeting With: ${repName}`,
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
        keyMap.set("617b0c6f-fef2-4950-8f9f-1781d8a1893b", res.results);
        console.log("Created: 617b0c6f-fef2-4950-8f9f-1781d8a1893b");
    })());
    await Promise.all(promises);
    console.log("Done with batch");
    promises = [];
};
exports.postC2DebriefInDatabase = postC2DebriefInDatabase;
