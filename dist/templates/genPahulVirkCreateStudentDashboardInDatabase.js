"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genPahulVirkCreateStudentDashboardInDatabase = void 0;
const clients_1 = require("../utils/clients");
const genPahulVirkCreateStudentDashboardInDatabase = async ({ parentId, }) => {
    const keyMap = new Map();
    const page = await clients_1.notionClient.pages.create({
        parent: {
            type: "database_id",
            database_id: parentId,
        },
        icon: {
            type: "emoji",
            emoji: "🚁",
        },
        properties: {
            Name: {
                title: [
                    {
                        text: {
                            content: "Pahul Virk - Create Student Dashboard",
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
                                content: "Directions",
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
                                content: "Copy student name",
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
                    checked: true,
                    color: "default",
                },
            },
            {
                to_do: {
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content: "Open in a separate tab",
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
                    checked: true,
                    color: "default",
                },
            },
            {
                to_do: {
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content: "Add new item to Accelerator Dashboard",
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
                    checked: true,
                    color: "default",
                },
            },
            {
                to_do: {
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content: "Link the lead field with the Student",
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
                    checked: true,
                    color: "default",
                },
            },
            {
                divider: {},
            },
            {
                to_do: {
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content: "Open the Dashboard Page",
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
                    checked: true,
                    color: "default",
                },
            },
            {
                to_do: {
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content: "Find all instances of <Student Full Name> and replace with student’s full name",
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
                    checked: true,
                    color: "default",
                },
            },
            {
                to_do: {
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content: "Replace <Folder Block> (in Resources section) with the folder block element",
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
                    checked: true,
                    color: "default",
                },
            },
            {
                to_do: {
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content: "Share the dashboard with the student email",
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
                    checked: true,
                    color: "default",
                },
            },
            {
                heading_1: {
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content: "Tutorial",
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
    keyMap.set("778a48cf088444258df76b40450c1b68", res.results);
    let promises = [];
    promises.push((async () => {
        const res = await clients_1.notionClient.blocks.children.append({
            block_id: keyMap.get("778a48cf088444258df76b40450c1b68")[10].id,
            children: [
                {
                    paragraph: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "See ",
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
                                    type: "page",
                                    page: {
                                        id: "c735d37a-78cd-43a2-8423-a7caf9b37ab9",
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
        keyMap.set("0013e548-64f3-494e-b121-f175d791b2b4", res.results);
        console.log("Created: 0013e548-64f3-494e-b121-f175d791b2b4");
    })());
    promises.push((async () => {
        const res = await clients_1.notionClient.blocks.children.append({
            block_id: keyMap.get("778a48cf088444258df76b40450c1b68")[9].id,
            children: [
                {
                    callout: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Copy Student Email: pahulsvirk@gmail.com",
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
                            emoji: "💡",
                        },
                        color: "gray_background",
                    },
                },
            ],
        });
        keyMap.set("197256a9-d1f5-4117-8bd6-6508f9720205", res.results);
        console.log("Created: 197256a9-d1f5-4117-8bd6-6508f9720205");
    })());
    promises.push((async () => {
        const res = await clients_1.notionClient.blocks.children.append({
            block_id: keyMap.get("778a48cf088444258df76b40450c1b68")[7].id,
            children: [
                {
                    to_do: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Should be done 3 times in total",
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
                        checked: true,
                        color: "default",
                    },
                },
            ],
        });
        keyMap.set("25709bfb-a396-4429-b38d-7d06ab5c4060", res.results);
        console.log("Created: 25709bfb-a396-4429-b38d-7d06ab5c4060");
    })());
    promises.push((async () => {
        const res = await clients_1.notionClient.blocks.children.append({
            block_id: keyMap.get("778a48cf088444258df76b40450c1b68")[8].id,
            children: [
                {
                    callout: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Copy Folder Block: ",
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
                            emoji: "💡",
                        },
                        color: "gray_background",
                    },
                },
            ],
        });
        keyMap.set("3bbd9ecb-b231-4307-87c1-6af5d36bc5fa", res.results);
        console.log("Created: 3bbd9ecb-b231-4307-87c1-6af5d36bc5fa");
    })());
    promises.push((async () => {
        const res = await clients_1.notionClient.blocks.children.append({
            block_id: keyMap.get("778a48cf088444258df76b40450c1b68")[2].id,
            children: [
                {
                    callout: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Open: ",
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
                                    type: "database",
                                    database: {
                                        id: "271a7f07-e25d-4fbd-a215-d7449802ad0b",
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
                        icon: {
                            type: "emoji",
                            emoji: "💡",
                        },
                        color: "gray_background",
                    },
                },
            ],
        });
        keyMap.set("7c28a663-5e60-48e8-bee4-f2d0229c4a33", res.results);
        console.log("Created: 7c28a663-5e60-48e8-bee4-f2d0229c4a33");
    })());
    promises.push((async () => {
        const res = await clients_1.notionClient.blocks.children.append({
            block_id: keyMap.get("778a48cf088444258df76b40450c1b68")[1].id,
            children: [
                {
                    callout: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Copy Full Name: Pahul Virk",
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
                            emoji: "💡",
                        },
                        color: "gray_background",
                    },
                },
            ],
        });
        keyMap.set("c3488ec3-c32c-41ef-98de-e312ffa5e4cc", res.results);
        console.log("Created: c3488ec3-c32c-41ef-98de-e312ffa5e4cc");
    })());
    await Promise.all(promises);
    console.log("Done with batch");
    promises = [];
    promises.push((async () => {
        const res = await clients_1.notionClient.blocks.children.append({
            block_id: keyMap.get("3bbd9ecb-b231-4307-87c1-6af5d36bc5fa")[0].id,
            children: [
                {
                    bookmark: {
                        caption: [],
                        url: "https://drive.google.com/drive/u/0/folders/1Pl3_TSljZkfv98Qow7F-WOgRLqSW_mwJ",
                    },
                },
            ],
        });
        keyMap.set("5011e6ce-adc5-4387-9ba2-fd92c5e6f266", res.results);
        console.log("Created: 5011e6ce-adc5-4387-9ba2-fd92c5e6f266");
    })());
    await Promise.all(promises);
    console.log("Done with batch");
    promises = [];
};
exports.genPahulVirkCreateStudentDashboardInDatabase = genPahulVirkCreateStudentDashboardInDatabase;
