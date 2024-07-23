"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateStudentBackgroundResponseInDatabase = void 0;
const clients_1 = require("../../utils/clients");
const shared_1 = require("../utils/shared");
const generateStudentBackgroundResponseInDatabase = async ({ parentId, name, uGPA, wGPA, additionalAcademic, additionalActivity, professionalLinks, transcripts, resumePortfolios, }) => {
    const t = transcripts !== ""
        ? transcripts.split(",").map((transcript) => ({
            bookmark: {
                caption: [],
                url: transcript,
            },
        }))
        : (0, shared_1.notProvided)("transcripts");
    const rp = resumePortfolios !== ""
        ? resumePortfolios.split(",").map((resumePortfolio) => ({
            bookmark: {
                caption: [],
                url: resumePortfolio,
            },
        }))
        : (0, shared_1.notProvided)("resume/portfolios");
    const keyMap = new Map();
    const page = await clients_1.notionClient.pages.create({
        parent: {
            type: "database_id",
            database_id: parentId,
        },
        icon: {
            type: "emoji",
            emoji: "🚸",
        },
        properties: {
            Name: {
                title: [
                    {
                        text: {
                            content: `${name}'s Student Background Response`,
                        },
                    },
                ],
            },
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
                                content: "Academics",
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
                                content: "Activities",
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
    keyMap.set("af235ba604404652ae140e19167babca", res.results);
    let promises = [];
    promises.push((async () => {
        const res = await clients_1.notionClient.blocks.children.append({
            block_id: keyMap.get("af235ba604404652ae140e19167babca")[1].id,
            children: [
                {
                    heading_3: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Resume/Portfolios",
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
                // @ts-ignore
                ...rp,
                {
                    heading_3: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Professional Links",
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
                                    content: professionalLinks,
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
                                    content: "Additional Activity Info",
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
                                    content: additionalActivity,
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
        keyMap.set("6a467a1f-e15d-4cab-a51b-b88df742b836", res.results);
        console.log("Created: 6a467a1f-e15d-4cab-a51b-b88df742b836");
    })());
    promises.push((async () => {
        const res = await clients_1.notionClient.blocks.children.append({
            block_id: keyMap.get("af235ba604404652ae140e19167babca")[0].id,
            children: [
                {
                    heading_3: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Grade",
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
                                    content: `uGPA: ${uGPA}, wGPA: ${wGPA}`,
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
                                    content: "Transcripts",
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
                // @ts-ignore
                ...t,
                {
                    heading_3: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Additional Academic Info",
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
                                    content: additionalAcademic,
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
        keyMap.set("8786c3af-0d3c-4057-978e-9588e328d879", res.results);
        console.log("Created: 8786c3af-0d3c-4057-978e-9588e328d879");
    })());
    await Promise.all(promises);
    console.log("Done with batch");
    promises = [];
};
exports.generateStudentBackgroundResponseInDatabase = generateStudentBackgroundResponseInDatabase;
