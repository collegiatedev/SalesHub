"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editEssay = void 0;
const helpers_1 = require("../../helpers");
const clients_1 = require("../../../clients");
const acceleratorTask_1 = require("../../../utils/acceleratorTask");
exports.editEssay = (0, helpers_1.asyncHandler)(async (req, res) => {
    const validatedParams = (0, helpers_1.checkBodyParams)(req, [
        "studentName",
        "studentPageId",
        "repPageId",
        "time",
        "docLink",
        "fileLink",
    ]);
    if (!validatedParams.isValid)
        return res.status(400).json({
            message: validatedParams.error,
        });
    await editStudentEssayInDatabase(validatedParams.params);
    return res.json({
        message: "Edit Student Essay Task - Generated",
    });
});
const editStudentEssayInDatabase = async ({ studentName, studentPageId, repPageId, time, docLink, fileLink, }) => {
    const EDIT_STUDENT_ESSAY_TASK = "0d286379401143628168cbf237940f66";
    const keyMap = new Map();
    const page = await clients_1.notionClient.pages.create((0, acceleratorTask_1.createAcceleratorTaskProps)({
        studentName,
        studentPageId,
        repPageId,
        time,
        emoji: "🔥",
        taskName: "Edit Student Essay",
        taskId: EDIT_STUDENT_ESSAY_TASK,
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
                                content: "Essay Editing",
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
                numbered_list_item: {
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content: "Copy and paste the text content from the student’s essay file upload into their doc",
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
                                content: "Essay Feedback",
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
                                content: "Use the ",
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
                                    id: "2ed05a54-2ad3-4c2f-a98e-df4e57273494",
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
                    ],
                    color: "default",
                },
            },
        ],
    });
    keyMap.set("0d286379401143628168cbf237940f66", res.results);
    let promises = [];
    promises.push((async () => {
        const res = await clients_1.notionClient.blocks.children.append({
            block_id: keyMap.get("0d286379401143628168cbf237940f66")[1].id,
            children: [
                {
                    callout: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Student Doc:",
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
                        icon: {
                            type: "emoji",
                            emoji: "👉",
                        },
                        color: "gray_background",
                    },
                },
                {
                    bulleted_list_item: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Student File: ",
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
                    bookmark: {
                        caption: [],
                        url: fileLink,
                    },
                },
            ],
        });
        keyMap.set("3d9b3e96-3c0e-48e3-b975-7cecedea8bef", res.results);
        console.log("Created: 3d9b3e96-3c0e-48e3-b975-7cecedea8bef");
    })());
    await Promise.all(promises);
    console.log("Done with batch");
    promises = [];
    promises.push((async () => {
        const res = await clients_1.notionClient.blocks.children.append({
            block_id: keyMap.get("3d9b3e96-3c0e-48e3-b975-7cecedea8bef")[0].id,
            children: [
                {
                    bookmark: {
                        caption: [],
                        url: docLink,
                    },
                },
            ],
        });
        keyMap.set("7c90bafd-6262-4799-8f85-fa894e97cc38", res.results);
        console.log("Created: 7c90bafd-6262-4799-8f85-fa894e97cc38");
    })());
    await Promise.all(promises);
    console.log("Done with batch");
    promises = [];
};
