"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genConductC1MeetingInDatabase = void 0;
const genConductC1MeetingInDatabase = async ({ parentId, }) => {
    const keyMap = new Map();
    const page = await notionClient.pages.create({
        parent: {
            type: "database_id",
            database_id: parentId,
        },
        icon: {
            type: "emoji",
            emoji: "🤝",
        },
        properties: {
            Name: {
                title: [
                    {
                        text: {
                            content: "Conduct C1 Meeting",
                        },
                    },
                ],
            },
        },
    });
    let res = await notionClient.blocks.children.append({
        block_id: page.id,
        children: [
            {
                heading_1: {
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content: "Introduction",
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
                                content: "Informal Q&A",
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
                                content: "Presentation",
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
                                content: "Closing ",
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
                                content: "Logistics",
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
                                content: "Resources",
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
                callout: {
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content: "Complete this form during and after the call ",
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
                                content: "(MANDATORY)",
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
                    icon: {
                        type: "emoji",
                        emoji: "⬇️",
                    },
                    color: "gray_background",
                },
            },
            {
                embed: {
                    caption: [
                        {
                            type: "text",
                            text: {
                                content: "You can also find the link in Accelerator Tasks\n",
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
                    url: "https://tally.so/r/npAVYb?id=2yozag01r1&name=John",
                },
            },
            {
                paragraph: {
                    rich_text: [],
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
    keyMap.set("50161c5bf2c14905b7a49e6fa33d5d5b", res.results);
    let promises = [];
    promises.push((async () => {
        const res = await notionClient.blocks.children.append({
            block_id: keyMap.get("50161c5bf2c14905b7a49e6fa33d5d5b")[1].id,
            children: [
                {
                    to_do: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "“From my experience guiding families through college admissions, I’ve found that we can provide our best advice when we learn more about your background. Would it be fair if I run by a couple of questions before we get started with our presentation?”",
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
                                    content: "Do you have an idea of what you want to major in?",
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
                                    content: "Ask the student:",
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
                        checked: false,
                        color: "default",
                    },
                },
                {
                    callout: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Most of the time, students leave out important info about their activities: the follow-up",
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
                                    content: " questions below will help jog their memory ",
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
                                    content: "so they don’t leave any information out.",
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
                {
                    divider: {},
                },
                {
                    heading_3: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Clarify the family’s goals + Have them understand why to get help now",
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
                                    content: " Ask the student: “",
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
                                    content: "Now that I have a clearer understanding of your background, what were you hoping to get out of our program? The more we know, the better we can help.” ",
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
                                    content: "Jot down the student’s response. Then, ask the parent ",
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
                                    content: "(address them by their first name)",
                                    link: null,
                                },
                                annotations: {
                                    bold: true,
                                    italic: true,
                                    strikethrough: false,
                                    underline: false,
                                    code: false,
                                    color: "default",
                                },
                            },
                            {
                                type: "text",
                                text: {
                                    content: ": ",
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
                                    content: "“Was there anything else you wanted us to help ",
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
                                    content: "(student name)",
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
                                    content: " with?  ",
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
                                    content: "If they vaguely say they want general guidance on the process, say this: “Yeah, completely understand – the admissions process can be more complicated than it needs to be. Just to make things simpler, where do you feel like you would need the most guidance: discovering impactful extracurriculars, exploring career interests, learning how to write a unique college essay, or developing a unique profile to stand out”",
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
                    callout: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Keep asking questions until you can identify a specific problem, such as “I don’t know how to edit my essays”, or “I don’t know whether I’m doing the best activities right now” (your goal should pick the biggest problems they are struggling with, help them understand why their current alternatives to solving this problem haven’t worked, and why we’re best positioned to help them)",
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
                {
                    to_do: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Use this Follow-up question",
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
                                    content: ": “So you mentioned you wanted us to offer some advice for ",
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
                                    content: "(insert problem they mentioned),",
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
                                    content: " what have you previously done to try to solve this",
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
                                    content: " ",
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
                                    content: "on your own” ",
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
                                    content: "(you want to insert the specific problem they bring up here)",
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
                                    content: "Then follow up with: “Why do you feel like now is the best time for us to help you…” (you want to insert what outcome they want, whether it’s preparing to get into a good school, learning valuable project-building skills, discovering their career interests, etc)",
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
        keyMap.set("3dd8787d-c0f1-42ed-a1b7-aa1da6b22e1e", res.results);
        console.log("Created: 3dd8787d-c0f1-42ed-a1b7-aa1da6b22e1e");
    })());
    promises.push((async () => {
        const res = await notionClient.blocks.children.append({
            block_id: keyMap.get("50161c5bf2c14905b7a49e6fa33d5d5b")[3].id,
            children: [
                {
                    callout: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "1. Create Student/Parent GC & send Tally Forms\n2. Schedule C2/C3—try to get these calls scheduled during the C1 meeting itself",
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
                {
                    heading_3: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Meeting Wrap Up",
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
                                    content: "Ask if they have any final questions before continuing",
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
                                    content: "Copy and paste the following into Zoom Chat, confirm that this is their contact info",
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
                                    content: "Send the student work call form and parent insight form in the Zoom chat (you can find the links in ",
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
                                        id: "c152fc19-a8b9-44a0-beba-b93ad9da6da2",
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
                                    content: ")",
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
                                    content: "Let them know you will also be sending them the forms (alongside any other relevant resources) into the GC (to be completed as a separate task)",
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
        keyMap.set("4a7e5eef-c25d-4bb9-b5bf-29b8959662e6", res.results);
        console.log("Created: 4a7e5eef-c25d-4bb9-b5bf-29b8959662e6");
    })());
    promises.push((async () => {
        const res = await notionClient.blocks.children.append({
            block_id: keyMap.get("50161c5bf2c14905b7a49e6fa33d5d5b")[2].id,
            children: [
                {
                    callout: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Make sure to only screen-share the slides on Zoom.\n",
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
                                    content: "DO NOT SHARE YOUR ENTIRE SCREEN.",
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
                        icon: {
                            type: "emoji",
                            emoji: "🚨",
                        },
                        color: "gray_background",
                    },
                },
                {
                    bookmark: {
                        caption: [],
                        url: "https://www.canva.com/design/DAFqcyTXTx4/u3DZltq2JAFZ1HXF3L_eMA/view?utm_content=DAFqcyTXTx4&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink",
                    },
                },
                {
                    heading_2: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Slide Notes",
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
        keyMap.set("a5524f04-be78-4c55-85fb-56310b3622dc", res.results);
        console.log("Created: a5524f04-be78-4c55-85fb-56310b3622dc");
    })());
    promises.push((async () => {
        const res = await notionClient.blocks.children.append({
            block_id: keyMap.get("50161c5bf2c14905b7a49e6fa33d5d5b")[0].id,
            children: [
                {
                    to_do: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Wait for both the parent and student to join the call",
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
                                    content: "Start by briefly asking about how they’re doing, alongside clarification on how to pronounce their names",
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
                                    content: "Once you’re ready to start, say “I want to make the most out of your time today, so I’ll briefly introduce my background”",
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
                                    content: "Explain your background (",
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
                                    content: "Name",
                                    link: null,
                                },
                                annotations: {
                                    bold: false,
                                    italic: false,
                                    strikethrough: false,
                                    underline: false,
                                    code: false,
                                    color: "red_background",
                                },
                            },
                            {
                                type: "text",
                                text: {
                                    content: " → ",
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
                                    content: "Experience",
                                    link: null,
                                },
                                annotations: {
                                    bold: false,
                                    italic: false,
                                    strikethrough: false,
                                    underline: false,
                                    code: false,
                                    color: "green_background",
                                },
                            },
                            {
                                type: "text",
                                text: {
                                    content: " → ",
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
                                    content: "Impact",
                                    link: null,
                                },
                                annotations: {
                                    bold: false,
                                    italic: false,
                                    strikethrough: false,
                                    underline: false,
                                    code: false,
                                    color: "blue_background",
                                },
                            },
                            {
                                type: "text",
                                text: {
                                    content: ")",
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
                                    content: "Cover the Accelerator Program",
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
        keyMap.set("d67e14f6-4a73-40de-b76a-36dc75dbad6d", res.results);
        console.log("Created: d67e14f6-4a73-40de-b76a-36dc75dbad6d");
    })());
    await Promise.all(promises);
    console.log("Done with batch");
    promises = [];
    promises.push((async () => {
        const res = await notionClient.blocks.children.append({
            block_id: keyMap.get("3dd8787d-c0f1-42ed-a1b7-aa1da6b22e1e")[1].id,
            children: [
                {
                    numbered_list_item: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "If they say yes, ask: so tell me more about why you’re interested in this field, were there any activities, competitions, or personal experiences that made you more curious about your major?",
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
                    numbered_list_item: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "If they provide more details about some personal experience, ask: “So you mentioned (…some mentioned activity) got you interested in your field, why do you think that experience helped you understand this field was something you’d be interested in?”",
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
                    numbered_list_item: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "“I’m also curious… have you taken any dual enrollment, summer programs, or classes outside of school to further your interests in any subjects”",
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
                    numbered_list_item: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "If they don’t know about majors—ask them about any subjects in class they enjoy",
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
        keyMap.set("d53c8c28-5596-47d0-9042-ad4f0fe91418", res.results);
        console.log("Created: d53c8c28-5596-47d0-9042-ad4f0fe91418");
    })());
    promises.push((async () => {
        const res = await notionClient.blocks.children.append({
            block_id: keyMap.get("3dd8787d-c0f1-42ed-a1b7-aa1da6b22e1e")[2].id,
            children: [
                {
                    numbered_list_item: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "How do you generally spend your time outside of school? When you describe any activities or extracurriculars you’ve done, try to structure your response in this format that I’ll put in the meeting chat",
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
                    callout: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Copy & Paste this into the meeting chat:",
                                    link: null,
                                },
                                annotations: {
                                    bold: true,
                                    italic: true,
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
                {
                    paragraph: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "(Try to remind the student if they leave out an option. For example, if they don’t quantify how many people they helped with a personal project or club, ask them to clarify in case they forgot. It’s okay if they genuinely don't know, but most students simply need an additional reminder.)",
                                    link: null,
                                },
                                annotations: {
                                    bold: false,
                                    italic: true,
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
                    divider: {},
                },
                {
                    paragraph: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Afterward, ask about their summer/winter plans",
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
                    numbered_list_item: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "How do you plan to spend your upcoming summer break? ",
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
        keyMap.set("ebccef74-3798-4bd1-82ef-0cf558d6b134", res.results);
        console.log("Created: ebccef74-3798-4bd1-82ef-0cf558d6b134");
    })());
    promises.push((async () => {
        const res = await notionClient.blocks.children.append({
            block_id: keyMap.get("4a7e5eef-c25d-4bb9-b5bf-29b8959662e6")[4].id,
            children: [
                {
                    callout: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "For Student: ",
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
                                    content: "https://collegiate.dev/c2",
                                    link: {
                                        url: "https://collegiate.dev/c2",
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
                                    content: "\nFor Parent: ",
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
                                    content: "https://collegiate.dev/c3",
                                    link: {
                                        url: "https://collegiate.dev/c3",
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
                        icon: {
                            type: "emoji",
                            emoji: "✉️",
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
                                    content: "“For the next steps, please fill out the forms I just sent into the chat. The student form is for scheduling the 2nd call, while the parent form is for scheduling the final call.",
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
                                    content: "“Since we have limited spots in our program, we can only guarantee the next work session if the parent form is completed today. Please check the form and let me know if there are any questions.”",
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
                                    content: "If they say they can’t find a time at the moment, let them know: “That’s alright, I’m happy to make an exception. To ensure we can secure our next meeting, the form needs to be completed within a week. Let me know if that’s reasonable for you.”",
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
        keyMap.set("0b88d31f-1d56-4f28-bd9a-7d7598a59868", res.results);
        console.log("Created: 0b88d31f-1d56-4f28-bd9a-7d7598a59868");
    })());
    promises.push((async () => {
        const res = await notionClient.blocks.children.append({
            block_id: keyMap.get("4a7e5eef-c25d-4bb9-b5bf-29b8959662e6")[3].id,
            children: [
                {
                    callout: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Student email: <student-email>, student number: <student-number>, parent email: <student-email>, parent number: <parent-number>",
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
        keyMap.set("d4cafc25-99f7-464e-a2cc-4ffce3e28eb8", res.results);
        console.log("Created: d4cafc25-99f7-464e-a2cc-4ffce3e28eb8");
    })());
    promises.push((async () => {
        const res = await notionClient.blocks.children.append({
            block_id: keyMap.get("a5524f04-be78-4c55-85fb-56310b3622dc")[2].id,
            children: [
                {
                    heading_3: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Introductory Slide",
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
                        is_toggleable: true,
                        color: "default",
                    },
                },
                {
                    heading_3: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Transition 1: Rules of the Game ",
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
                    heading_3: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Deadlines Slide ",
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
                    heading_3: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Admissions Factors ",
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
                    heading_3: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Transition 2: Strategies for the Game",
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
                    heading_3: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Duel Enrollment",
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
                    heading_3: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Signature Project",
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
                    heading_3: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Personality ",
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
                    heading_3: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Personal Branding",
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
                    heading_3: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Transition 3: Moving Beyond the Game ",
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
                    heading_3: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Stepping Stones to Success",
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
        keyMap.set("bf3c0a94-fea6-4ad1-8b8e-65df37dc8d20", res.results);
        console.log("Created: bf3c0a94-fea6-4ad1-8b8e-65df37dc8d20");
    })());
    promises.push((async () => {
        const res = await notionClient.blocks.children.append({
            block_id: keyMap.get("d67e14f6-4a73-40de-b76a-36dc75dbad6d")[0].id,
            children: [
                {
                    bulleted_list_item: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Do not get started until both are on call",
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
                                    content: "Request that they turn on their camera if it is off",
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
                                    content: "Confirm that audio works for both sides",
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
        keyMap.set("0bec9ce2-c265-4112-bb9a-fbd19e9873bd", res.results);
        console.log("Created: 0bec9ce2-c265-4112-bb9a-fbd19e9873bd");
    })());
    promises.push((async () => {
        const res = await notionClient.blocks.children.append({
            block_id: keyMap.get("d67e14f6-4a73-40de-b76a-36dc75dbad6d")[4].id,
            children: [
                {
                    bulleted_list_item: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "“Today’s meeting is the first call in our free Accelerator Program”",
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
                                    content: "“Do you have an idea of how our program works?”",
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
                                    content: "Meeting 1: we’ll go over a presentation on college admissions and provide you with the best strategies to stand out in this process. ",
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
                                    content: "Meeting 2: (",
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
                                    content: "Student Name) ",
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
                                    content: " will have the opportunity to work individually with one of our mentors to directly add value to any component of their applications",
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
                                    content: "Meeting 3: We’ll create a free resource that’s tailored to ",
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
                                    content: "(student name’s) ",
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
                                    content: "needs. You can keep this resource, regardless of whether you continue with our main program. Afterward, we can discuss if you want to move forward with our paid consulting program, where we can discuss our year-round professional services. ",
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
                                    content: "“Do you have any questions before we get started?” ",
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
                        color: "default",
                    },
                },
            ],
        });
        keyMap.set("0e222e1d-0e7d-4ced-9c89-2078ea913cb7", res.results);
        console.log("Created: 0e222e1d-0e7d-4ced-9c89-2078ea913cb7");
    })());
    promises.push((async () => {
        const res = await notionClient.blocks.children.append({
            block_id: keyMap.get("d67e14f6-4a73-40de-b76a-36dc75dbad6d")[3].id,
            children: [
                {
                    bulleted_list_item: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Only mention ",
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
                                    content: "Experience ",
                                    link: null,
                                },
                                annotations: {
                                    bold: false,
                                    italic: false,
                                    strikethrough: false,
                                    underline: false,
                                    code: false,
                                    color: "green_background",
                                },
                            },
                            {
                                type: "text",
                                text: {
                                    content: "if its good traditional ethos (ex: attending a T-10 program). Otherwise, just jump directly to ",
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
                                    content: "Impact",
                                    link: null,
                                },
                                annotations: {
                                    bold: false,
                                    italic: false,
                                    strikethrough: false,
                                    underline: false,
                                    code: false,
                                    color: "blue_background",
                                },
                            },
                            {
                                type: "text",
                                text: {
                                    content: ".",
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
                                    content: "ex: ",
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
                                    content: "My name is Jesse,",
                                    link: null,
                                },
                                annotations: {
                                    bold: false,
                                    italic: false,
                                    strikethrough: false,
                                    underline: false,
                                    code: false,
                                    color: "red_background",
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
                            {
                                type: "text",
                                text: {
                                    content: "I’m a current junior studying CS at UIUC.",
                                    link: null,
                                },
                                annotations: {
                                    bold: false,
                                    italic: false,
                                    strikethrough: false,
                                    underline: false,
                                    code: false,
                                    color: "green_background",
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
                            {
                                type: "text",
                                text: {
                                    content: "As a mentor at Collegiate, I’ve built resources that help students secure internships, build successful projects, and edit college applications to secure spots at top programs like Duke, UCLA, Berkeley, and more.",
                                    link: null,
                                },
                                annotations: {
                                    bold: false,
                                    italic: false,
                                    strikethrough: false,
                                    underline: false,
                                    code: false,
                                    color: "blue_background",
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
                                    content: "For more info + ethos, refer them to the company website",
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
        keyMap.set("90471e5f-346a-4d5d-a511-ea5213476ec1", res.results);
        console.log("Created: 90471e5f-346a-4d5d-a511-ea5213476ec1");
    })());
    await Promise.all(promises);
    console.log("Done with batch");
    promises = [];
    promises.push((async () => {
        const res = await notionClient.blocks.children.append({
            block_id: keyMap.get("d53c8c28-5596-47d0-9042-ad4f0fe91418")[3].id,
            children: [
                {
                    bulleted_list_item: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "ex: ",
                                    link: null,
                                },
                                annotations: {
                                    bold: false,
                                    italic: true,
                                    strikethrough: false,
                                    underline: false,
                                    code: false,
                                    color: "default",
                                },
                            },
                            {
                                type: "text",
                                text: {
                                    content: "“Do you enjoy Math/STEM classes more or humanities courses? What particular concepts do you find intriguing about these classes” ",
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
        keyMap.set("5bba7cdf-1742-4977-a2e3-a6953d5c15c5", res.results);
        console.log("Created: 5bba7cdf-1742-4977-a2e3-a6953d5c15c5");
    })());
    promises.push((async () => {
        const res = await notionClient.blocks.children.append({
            block_id: keyMap.get("ebccef74-3798-4bd1-82ef-0cf558d6b134")[5].id,
            children: [
                {
                    bulleted_list_item: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "If they’re a current senior in the summer, skip this question",
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
                                    content: "If they don’t provide much info, ask if they have any summer programs, projects, or competitions they’re planning to do",
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
                                    content: "If this call occurs after summer, ask about winter break plans",
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
        keyMap.set("094c8094-b14f-42ed-98d3-32b6f619776b", res.results);
        console.log("Created: 094c8094-b14f-42ed-98d3-32b6f619776b");
    })());
    promises.push((async () => {
        const res = await notionClient.blocks.children.append({
            block_id: keyMap.get("ebccef74-3798-4bd1-82ef-0cf558d6b134")[1].id,
            children: [
                {
                    numbered_list_item: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Name of Activity",
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
                        color: "default",
                    },
                },
                {
                    numbered_list_item: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Position/Leadership Title",
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
                        color: "default",
                    },
                },
                {
                    numbered_list_item: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "What did you do on a day-to-day basis",
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
                        color: "default",
                    },
                },
                {
                    numbered_list_item: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Describe any quantitive/qualitative impact you had (how many people did you impact, how much money did you fundraise, etc)",
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
                        color: "default",
                    },
                },
                {
                    numbered_list_item: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "How was this aligned with your career interests\n",
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
                        color: "default",
                    },
                },
            ],
        });
        keyMap.set("7f1655fe-7e1b-4c46-8fc5-1e4e441a959e", res.results);
        console.log("Created: 7f1655fe-7e1b-4c46-8fc5-1e4e441a959e");
    })());
    promises.push((async () => {
        const res = await notionClient.blocks.children.append({
            block_id: keyMap.get("bf3c0a94-fea6-4ad1-8b8e-65df37dc8d20")[10].id,
            children: [
                {
                    paragraph: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Here at Collegiate, we emphasize that college is merely a stepping-stone and not the final destination for our students. The bigger picture is setting themselves up for their dream internship and job after graduation. While getting into top schools can certainly help, we want to highlight the following three traits we aim to foster in our students, regardless of which colleges they end up in. ",
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
                        color: "default",
                    },
                },
                {
                    numbered_list_item: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: " Ambition – ",
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
                                    content: "Think big, and avoid playing small. Whether it’s encouraging our students to dream big on their career plans, or taking on challenging projects and competitions, we want to challenge our students to be dedicated to their personal growth.  ",
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
                    numbered_list_item: {
                        rich_text: [
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
                            {
                                type: "text",
                                text: {
                                    content: "Authenticity – Y",
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
                                    content: "ou don’t need to completely abandon all your interests to appease an admissions officer or employer. While we recommend students to be strategic with their time, we advocate a balance with their personal interests. Since they still need to find extracurriculars/internships in college, this approach to building activities is more enjoyable, but also more sustainable in the long term. ",
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
                    numbered_list_item: {
                        rich_text: [
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
                            {
                                type: "text",
                                text: {
                                    content: "Agency – ",
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
                                    content: "Take initiative, whether it’s starting an organization, project, or simply networking with other professionals to establish connections in their industry. Student Agency is one of the highest sough-out traits in the early professional world which is also why we want to nurture these characteristics in our students. ",
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
                                    content: "Main takeaways:",
                                    link: null,
                                },
                                annotations: {
                                    bold: true,
                                    italic: false,
                                    strikethrough: false,
                                    underline: true,
                                    code: false,
                                    color: "default",
                                },
                            },
                            {
                                type: "text",
                                text: {
                                    content: " Some students can get into top colleges and graduate without a job post-graduation; others may not end up at T10 schools but have countless internships and job offers – the separating factor between the most successful students comes down to their dedication, resourcefulness, and initiative. That’s why we believe that getting started right now, with the right mentality and support system, can accelerate your student’s early career development. \n",
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
                                    content: "I hope you found value in this presentation, I’d be more than happy to answer any questions",
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
        keyMap.set("25c9f584-64dd-41f2-b37e-91f233ff464c", res.results);
        console.log("Created: 25c9f584-64dd-41f2-b37e-91f233ff464c");
    })());
    promises.push((async () => {
        const res = await notionClient.blocks.children.append({
            block_id: keyMap.get("bf3c0a94-fea6-4ad1-8b8e-65df37dc8d20")[2].id,
            children: [
                {
                    paragraph: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Have you heard of the following deadline terms: EA, ED, UC, and RD?",
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
                            {
                                type: "text",
                                text: {
                                    content: "(clarify terms they aren’t clear on) ",
                                    link: null,
                                },
                                annotations: {
                                    bold: false,
                                    italic: true,
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
                                    content: "Let’s start with EA and ED",
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
                        color: "default",
                    },
                },
                {
                    bulleted_list_item: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "UC ",
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
                        color: "default",
                    },
                },
                {
                    bulleted_list_item: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "RD",
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
                        color: "default",
                    },
                },
            ],
        });
        keyMap.set("3c5fdc1d-8a78-4102-a38c-c738ccae6b30", res.results);
        console.log("Created: 3c5fdc1d-8a78-4102-a38c-c738ccae6b30");
    })());
    promises.push((async () => {
        const res = await notionClient.blocks.children.append({
            block_id: keyMap.get("bf3c0a94-fea6-4ad1-8b8e-65df37dc8d20")[7].id,
            children: [
                {
                    paragraph: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "The final strategy we would like to mention is usually the most misunderstood aspect of the admissions process: Personality. Many students think they need to use fancy words to impress an admissions officer; instead, they need to be understandable and communicate characteristics that would add value to a college campus",
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
                    numbered_list_item: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "A student we helped in the past was accepted into UC Berkeley. We took two statements from an essay that asked about her creative side. ",
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
                                    content: "I’d like to ask you which version you think would sound more compelling to an admissions officer",
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
                        color: "default",
                    },
                },
                {
                    numbered_list_item: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "The first example demonstrated very generic traits; any student can mention how they are extroverted or patient, but from an admissions officer’s perspective, it’s hard to understand what personal contribution this student would make to their campus. ",
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
                    numbered_list_item: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "After multiple rounds of revisions, the second statement you see was much more specific to her unique experiences. We did this by sitting on multiple calls with her and understanding how she created art designs to uplift her loved ones during challenging moments in their lives. This essay now displays an intersection of empathy, creativity, and thoughtfulness – traits that would be valuable in a campus community.  ",
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
                                    content: "\n",
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
                                    content: "Main Takeaways:",
                                    link: null,
                                },
                                annotations: {
                                    bold: true,
                                    italic: false,
                                    strikethrough: false,
                                    underline: true,
                                    code: false,
                                    color: "default",
                                },
                            },
                            {
                                type: "text",
                                text: {
                                    content: "  A",
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
                                    content: "rticulate a story that’s easily understandable but provides subtle reasons for why your student would provide value to a college campus. ",
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
        keyMap.set("48b268bd-7b0b-48b6-b7e6-f4f873728efd", res.results);
        console.log("Created: 48b268bd-7b0b-48b6-b7e6-f4f873728efd");
    })());
    promises.push((async () => {
        const res = await notionClient.blocks.children.append({
            block_id: keyMap.get("bf3c0a94-fea6-4ad1-8b8e-65df37dc8d20")[5].id,
            children: [
                {
                    paragraph: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "The first thing admissions officers will see is your GPA, and to improve your academic profile, one of the most effective strategies we recommend is Dual Enrollment. You can enroll in courses for free in your local community college and it provides you with 4 main advantages: ",
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
                    numbered_list_item: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Obtain GPA Boost",
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
                                    content: " (grades are weighted on 5.0/4.0) scale",
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
                    numbered_list_item: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: " Fulfills College Pre-requisites",
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
                                    content: " (You obtain college credit for these courses, so when you attend classes at university, you can skip most gen-ed requirements other students take and get ahead by taking classes that are related to your major)",
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
                    numbered_list_item: {
                        rich_text: [
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
                            {
                                type: "text",
                                text: {
                                    content: "Demonstrated Interest in Major: ",
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
                                    content: "(Many students can easily take honors/AP courses at their hs, but if your child takes the time to enroll in college-level courses, it proves more initiative and alignment by with their intended major)",
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
                    numbered_list_item: {
                        rich_text: [
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
                            {
                                type: "text",
                                text: {
                                    content: "Cost Saving",
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
                                    content: " (The more credits you get, the earlier you can graduate in college. If you take enough classes, you can save a semester or whole year’s worth of tuition). ",
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
                                    content: "Main Takeaway:",
                                    link: null,
                                },
                                annotations: {
                                    bold: true,
                                    italic: false,
                                    strikethrough: false,
                                    underline: true,
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
                                    content: "Dual Enrollment is an affordable, low-risk solution to improve your child’s academics, chances of admission, and tuition cost while they’re in college ",
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
        keyMap.set("568dc248-16c6-42fa-9569-eb4659c753b6", res.results);
        console.log("Created: 568dc248-16c6-42fa-9569-eb4659c753b6");
    })());
    promises.push((async () => {
        const res = await notionClient.blocks.children.append({
            block_id: keyMap.get("bf3c0a94-fea6-4ad1-8b8e-65df37dc8d20")[3].id,
            children: [
                {
                    paragraph: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Aside from knowing application deadlines, it’s more important to know what admissions officers are looking for so you can be strategic about how you spend your time in hs.  ",
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
                        color: "default",
                    },
                },
                {
                    bulleted_list_item: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Academics – tells admissions officers if you can handle the academic rigor of their school",
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
                        color: "default",
                    },
                },
                {
                    bulleted_list_item: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "E",
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
                                    content: "C’s –  Beyond GPA, provides context about your child’s interests, personal strengths, and leadership ability. ",
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
                        color: "default",
                    },
                },
                {
                    bulleted_list_item: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Personality – the glue to your entire application",
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
                        color: "default",
                    },
                },
                {
                    paragraph: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Most important takeaway:",
                                    link: null,
                                },
                                annotations: {
                                    bold: true,
                                    italic: false,
                                    strikethrough: false,
                                    underline: true,
                                    code: false,
                                    color: "default",
                                },
                            },
                            {
                                type: "text",
                                text: {
                                    content: " To succeed, you should approach this as a holistic process, instead of maximizing academics and neglecting other components of your application. Since every student has distinct strengths and interests, a personalized strategy is most optimal for standing out in their applications. ",
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
                        color: "default",
                    },
                },
            ],
        });
        keyMap.set("6f01dbf5-97e7-4614-8305-08992619c9ff", res.results);
        console.log("Created: 6f01dbf5-97e7-4614-8305-08992619c9ff");
    })());
    promises.push((async () => {
        const res = await notionClient.blocks.children.append({
            block_id: keyMap.get("bf3c0a94-fea6-4ad1-8b8e-65df37dc8d20")[8].id,
            children: [
                {
                    paragraph: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Personal Branding is the important takeaway we want you to have in this presentation. I’ll walk through how your application will look from the perspective of an admissions officer.",
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
                        color: "default",
                    },
                },
                {
                    paragraph: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Stage 1: Basic applicant.",
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
                                    content: " First thing they will notice is their GPA, course load, and a couple of extracurriculars that are represented by the white circles above. However, they aren’t able to tie their extracurriculars to any of their academic or personal interests",
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
                                    content: "Stage 2: Intermediate applicant.",
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
                                    content: " Let’s say you took our advice and implemented a signature project, completed some summer programs, and enrolled in community college courses to show alignment with your intended major and extracurricular interests. The only component that’s lacking is connecting all these experiences in your essays.",
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
                                    content: "Stage 3: Advanced Applicant",
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
                                    content: ". This student not only proves their career alignments and extracurricular interests; they also communicate it in their writing, conveying the overlap between their extracurricular, academic, and personal interests. Essentially, the student can pull off the most difficult part of the admissions process: developing an  “X-Factor” to stand out in their application.  ",
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
                                    content: "\nMain Takeaways:",
                                    link: null,
                                },
                                annotations: {
                                    bold: true,
                                    italic: false,
                                    strikethrough: false,
                                    underline: true,
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
                                    content: "Most Universities are not charities that provide free education; they are businesses that receive value by admitting students who will boost their reputation. Your student’s personal brand is how they communicate the value they would add to their campus, in a way that’s distinguished from other applicants. ",
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
        keyMap.set("8a885738-9d7f-4e8a-9aec-9f06a9dc910d", res.results);
        console.log("Created: 8a885738-9d7f-4e8a-9aec-9f06a9dc910d");
    })());
    promises.push((async () => {
        const res = await notionClient.blocks.children.append({
            block_id: keyMap.get("bf3c0a94-fea6-4ad1-8b8e-65df37dc8d20")[6].id,
            children: [
                {
                    numbered_list_item: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Beyond academics, extracurriculars are essential to boosting your application. However, many students we work with either don’t know what to do, or how to make their existing activities more impactful – especially since so many kids participate in the same clubs or competitions. ",
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
                    numbered_list_item: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "That’s why we recommend students build a signature project, combining their experiences from other activities into a cohesive project. To paint a clearer picture, I’ll provide a specific example of a student we’ve previously helped. This student was a Computer Science Major with a background in coding and graphic design. However, she was also doing a political campaign internship, and it was hard to communicate how these interests were aligned with her goals in CS. ",
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
                    numbered_list_item: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "To resolve this issue, we guided her to build a VR voting booth to increase voter turnout, aligning her coding and graphic design skills with social causes, such as making voting more accessible in her political internship. ",
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
                                    content: "Key Takeaways:",
                                    link: null,
                                },
                                annotations: {
                                    bold: true,
                                    italic: false,
                                    strikethrough: false,
                                    underline: true,
                                    code: false,
                                    color: "default",
                                },
                            },
                            {
                                type: "text",
                                text: {
                                    content: " In a process where so many students get stuck doing the same activities, a signature project gives your child an opportunity to stand out for two reasons: It’s personalized around multiple areas of interest that are unique to your student and has a genuine impact. ",
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
                        rich_text: [],
                        color: "default",
                    },
                },
            ],
        });
        keyMap.set("b93ab536-0093-42ae-b437-cb4ddf4b0a00", res.results);
        console.log("Created: b93ab536-0093-42ae-b437-cb4ddf4b0a00");
    })());
    promises.push((async () => {
        const res = await notionClient.blocks.children.append({
            block_id: keyMap.get("bf3c0a94-fea6-4ad1-8b8e-65df37dc8d20")[4].id,
            children: [
                {
                    paragraph: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Now that we’ve covered the most important factors in the admissions process, all the strategies we recommend will be centered around them. ",
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
        keyMap.set("c65fe82f-884b-4f4e-98b2-48f2e554a1cc", res.results);
        console.log("Created: c65fe82f-884b-4f4e-98b2-48f2e554a1cc");
    })());
    promises.push((async () => {
        const res = await notionClient.blocks.children.append({
            block_id: keyMap.get("bf3c0a94-fea6-4ad1-8b8e-65df37dc8d20")[0].id,
            children: [
                {
                    paragraph: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Welcome to Collegiate, we’ll cover three important strategies to help you succeed in hs, college applications, and beyond the admissions process. ",
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
        keyMap.set("d48d16d2-0b6a-4fce-aad7-fe3c8d1c0ab1", res.results);
        console.log("Created: d48d16d2-0b6a-4fce-aad7-fe3c8d1c0ab1");
    })());
    promises.push((async () => {
        const res = await notionClient.blocks.children.append({
            block_id: keyMap.get("bf3c0a94-fea6-4ad1-8b8e-65df37dc8d20")[1].id,
            children: [
                {
                    paragraph: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Before we explain these strategies, it’s important that we cover how the admissions process works to understand what colleges are looking for in top applicants. That way, each strategy we recommend is based on factors that have previously helped students succeed.",
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
        keyMap.set("d9e06ece-430c-40a7-9b71-452ebc7a6381", res.results);
        console.log("Created: d9e06ece-430c-40a7-9b71-452ebc7a6381");
    })());
    promises.push((async () => {
        const res = await notionClient.blocks.children.append({
            block_id: keyMap.get("bf3c0a94-fea6-4ad1-8b8e-65df37dc8d20")[9].id,
            children: [
                {
                    paragraph: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Finally, I want to wrap this presentation up by setting up your student for long-term success, beyond the admissions process",
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
        keyMap.set("f05ea0fc-5def-4469-a10e-d3da823123c0", res.results);
        console.log("Created: f05ea0fc-5def-4469-a10e-d3da823123c0");
    })());
    promises.push((async () => {
        const res = await notionClient.blocks.children.append({
            block_id: keyMap.get("0e222e1d-0e7d-4ced-9c89-2078ea913cb7")[1].id,
            children: [
                {
                    bulleted_list_item: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "If yes, have them explain it briefly; if they give a reasonable description, acknowledge their response, then say that there are just a few things you would like to add",
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
                                    content: "Regardless of the answer, clarify how the program works and what they’ll get out of it ",
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
        keyMap.set("8a954a2b-9d0b-4195-bdfb-273f214d9837", res.results);
        console.log("Created: 8a954a2b-9d0b-4195-bdfb-273f214d9837");
    })());
    promises.push((async () => {
        const res = await notionClient.blocks.children.append({
            block_id: keyMap.get("90471e5f-346a-4d5d-a511-ea5213476ec1")[2].id,
            children: [
                {
                    bulleted_list_item: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "https://collegiate-consulting.com/",
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
                        ],
                        color: "default",
                    },
                },
            ],
        });
        keyMap.set("e7163da7-1075-4ca0-a5df-399813ebc07a", res.results);
        console.log("Created: e7163da7-1075-4ca0-a5df-399813ebc07a");
    })());
    await Promise.all(promises);
    console.log("Done with batch");
    promises = [];
    promises.push((async () => {
        const res = await notionClient.blocks.children.append({
            block_id: keyMap.get("3c5fdc1d-8a78-4102-a38c-c738ccae6b30")[2].id,
            children: [
                {
                    bulleted_list_item: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "If you’re planning to apply to schools in California, it requires a single application sent to all universities  under the UC system by November 30th",
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
        keyMap.set("11b34db8-2e56-43c5-9155-15424f632a26", res.results);
        console.log("Created: 11b34db8-2e56-43c5-9155-15424f632a26");
    })());
    promises.push((async () => {
        const res = await notionClient.blocks.children.append({
            block_id: keyMap.get("3c5fdc1d-8a78-4102-a38c-c738ccae6b30")[3].id,
            children: [
                {
                    bulleted_list_item: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Pros: Have more time to craft application",
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
                                    content: "Cons: More competitive pool, generally lower acceptance rate ",
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
        keyMap.set("8e2b526c-3176-47a9-b4b1-ff1a3d3948e6", res.results);
        console.log("Created: 8e2b526c-3176-47a9-b4b1-ff1a3d3948e6");
    })());
    promises.push((async () => {
        const res = await notionClient.blocks.children.append({
            block_id: keyMap.get("3c5fdc1d-8a78-4102-a38c-c738ccae6b30")[1].id,
            children: [
                {
                    bulleted_list_item: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Pros: Both boost acceptance rate,  however, the acceptance rate from ED is generally higher",
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
                                    content: "Cons: Both deadlines are earlier, and ED will require you to attend the school if accepted. You can only ED to one school, but you can EA to as many schools that allow it.",
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
        keyMap.set("e69c109a-5f27-4d8f-9ca6-01d31be905ec", res.results);
        console.log("Created: e69c109a-5f27-4d8f-9ca6-01d31be905ec");
    })());
    promises.push((async () => {
        const res = await notionClient.blocks.children.append({
            block_id: keyMap.get("6f01dbf5-97e7-4614-8305-08992619c9ff")[1].id,
            children: [
                {
                    bulleted_list_item: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "GPA, SAT/ACT, and AP Exam Scores",
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
        keyMap.set("285609bc-a4fd-412c-b647-76de6309880e", res.results);
        console.log("Created: 285609bc-a4fd-412c-b647-76de6309880e");
    })());
    promises.push((async () => {
        const res = await notionClient.blocks.children.append({
            block_id: keyMap.get("6f01dbf5-97e7-4614-8305-08992619c9ff")[2].id,
            children: [
                {
                    bulleted_list_item: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Not all EC’s are created equal – some will give a bigger boost to your applications than others ",
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
                        color: "default",
                    },
                },
            ],
        });
        keyMap.set("8a7996aa-9bed-4fb0-9df3-77119efd5ba4", res.results);
        console.log("Created: 8a7996aa-9bed-4fb0-9df3-77119efd5ba4");
    })());
    promises.push((async () => {
        const res = await notionClient.blocks.children.append({
            block_id: keyMap.get("6f01dbf5-97e7-4614-8305-08992619c9ff")[3].id,
            children: [
                {
                    bulleted_list_item: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "This is usually what most students don’t understand abo",
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
                                    content: "ut the admissions process – good grades and ECs can’t compensate for poorly written essays. ",
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
                                    content: "There are countless students with perfect grades and national accomplishments; ",
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
                                    content: "what will help your child stand out isn’t only about having the best stats, but telling a story about their experiences in a way that other students won’t. ",
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
                        color: "default",
                    },
                },
            ],
        });
        keyMap.set("b5ff766c-ff9d-4e05-9c2d-82bc3f3970d7", res.results);
        console.log("Created: b5ff766c-ff9d-4e05-9c2d-82bc3f3970d7");
    })());
    await Promise.all(promises);
    console.log("Done with batch");
    promises = [];
    promises.push((async () => {
        const res = await notionClient.blocks.children.append({
            block_id: keyMap.get("8a7996aa-9bed-4fb0-9df3-77119efd5ba4")[0].id,
            children: [
                {
                    numbered_list_item: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Nationally recognized achievements, Starting a business/organization that had very strong impact, publishing research ",
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
                    numbered_list_item: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "State/local achievements from competitions, Holding Strong Leadership Positions in Well-recognized clubs/organizations ",
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
                    numbered_list_item: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Participating in a club or doing minimal volunteering work ",
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
        keyMap.set("76528c08-5841-4bac-becd-b0f0bcf62450", res.results);
        console.log("Created: 76528c08-5841-4bac-becd-b0f0bcf62450");
    })());
    await Promise.all(promises);
    console.log("Done with batch");
    promises = [];
};
exports.genConductC1MeetingInDatabase = genConductC1MeetingInDatabase;
