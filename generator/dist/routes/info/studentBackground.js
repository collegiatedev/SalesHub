"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentBackgroundInDatabase = exports.studentBackground = void 0;
const helpers_1 = require("../helpers");
const clients_1 = require("../../clients");
const studentInfo_1 = require("../../utils/studentInfo");
const notProvided_1 = require("../../utils/notProvided");
exports.studentBackground = (0, helpers_1.asyncHandler)(async (req, res) => {
    // using body params because url string ruins the header query
    const validatedParams = (0, helpers_1.checkBodyParams)(req, ["studentName", "infoId", "uGPA", "wGPA"], [
        "additionalAcademic",
        "additionalActivity",
        "professionalLinks",
        "transcripts",
        "resumePortfolios",
    ]);
    if (!validatedParams.isValid)
        return res.status(400).json({
            message: validatedParams.error,
        });
    await (0, exports.studentBackgroundInDatabase)(validatedParams.params);
    return res.json({
        message: "student background response created",
    });
});
const studentBackgroundInDatabase = async ({ studentName, infoId, uGPA, wGPA, additionalAcademic, additionalActivity, professionalLinks, transcripts, resumePortfolios, }) => {
    const keyMap = new Map();
    const page = await clients_1.notionClient.pages.create((0, studentInfo_1.createInfoPageProps)({
        studentName,
        infoId,
        infoName: "Student Background Response",
        emoji: "🚸",
    }));
    const t = transcripts !== ""
        ? transcripts.split(",").map((transcript) => ({
            bookmark: {
                caption: [],
                url: transcript,
            },
        }))
        : [(0, notProvided_1.notProvided)("transcripts")];
    const rp = resumePortfolios !== ""
        ? resumePortfolios.split(",").map((resumePortfolio) => ({
            bookmark: {
                caption: [],
                url: resumePortfolio,
            },
        }))
        : [(0, notProvided_1.notProvided)("resume/portfolios")];
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
exports.studentBackgroundInDatabase = studentBackgroundInDatabase;
