"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFamilyGCInDatabase = void 0;
const clients_1 = require("../utils/clients");
const createFamilyGCInDatabase = async ({ parentId, }) => {
    const keyMap = new Map();
    const page = await clients_1.notionClient.pages.create({
        parent: {
            type: "database_id",
            database_id: parentId,
        },
        icon: {
            type: "emoji",
            emoji: "💬",
        },
        properties: {
            Name: {
                title: [
                    {
                        text: {
                            content: "Create Family GC",
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
                heading_3: {
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content: "Todos",
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
                                content: "Make a GC using the Outreach Google Voice Number",
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
                                content: "Send the text:",
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
                                content: "Send any relevant links as discussed on call; make sure links are marked C1 and ready (checked off): ",
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
                                    id: "d85f4b37-0dd2-44a1-9482-1b7abc049392",
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
                                content: "Name the contacts:",
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
    keyMap.set("5576b4a91e2f45999e1e209f467b60be", res.results);
    let promises = [];
    promises.push((async () => {
        const res = await clients_1.notionClient.blocks.children.append({
            block_id: keyMap.get("5576b4a91e2f45999e1e209f467b60be")[4].id,
            children: [
                {
                    callout: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "<student-name> (Student)\n<parent-name> (<student-name>’s Parent)",
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
                            emoji: "📄",
                        },
                        color: "gray_background",
                    },
                },
            ],
        });
        keyMap.set("314c9e5a-3c1e-4f9e-8435-407e13ede42e", res.results);
        console.log("Created: 314c9e5a-3c1e-4f9e-8435-407e13ede42e");
    })());
    promises.push((async () => {
        const res = await clients_1.notionClient.blocks.children.append({
            block_id: keyMap.get("5576b4a91e2f45999e1e209f467b60be")[1].id,
            children: [
                {
                    callout: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Student: <student-name>, <student-phone>\nParent: <parent-name>, <parent-phone>",
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
        keyMap.set("738fb89a-74ab-414c-8984-a50178e9b57b", res.results);
        console.log("Created: 738fb89a-74ab-414c-8984-a50178e9b57b");
    })());
    promises.push((async () => {
        const res = await clients_1.notionClient.blocks.children.append({
            block_id: keyMap.get("5576b4a91e2f45999e1e209f467b60be")[2].id,
            children: [
                {
                    callout: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Hi <Student Name> and Family, it was a pleasure meeting! Here are the forms to complete to continue with Collegiate:",
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
                            emoji: "✉️",
                        },
                        color: "gray_background",
                    },
                },
            ],
        });
        keyMap.set("e5419a2f-bcd6-48b6-a13e-352a388def7f", res.results);
        console.log("Created: e5419a2f-bcd6-48b6-a13e-352a388def7f");
    })());
    await Promise.all(promises);
    console.log("Done with batch");
    promises = [];
    promises.push((async () => {
        const res = await clients_1.notionClient.blocks.children.append({
            block_id: keyMap.get("e5419a2f-bcd6-48b6-a13e-352a388def7f")[0].id,
            children: [
                {
                    paragraph: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "1. For Student: ",
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
                                    content: "<student-link>",
                                    link: {
                                        url: "https://collegiate-consulting.com/",
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
                                    content: "\n2. For Parent: ",
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
                                    content: "<parent-link>",
                                    link: {
                                        url: "https://app.cal.com/bookings/upcoming",
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
        keyMap.set("a813f05a-70fa-41ce-8526-a67e7a6e1079", res.results);
        console.log("Created: a813f05a-70fa-41ce-8526-a67e7a6e1079");
    })());
    await Promise.all(promises);
    console.log("Done with batch");
    promises = [];
};
exports.createFamilyGCInDatabase = createFamilyGCInDatabase;
