interface ConductC1MeetingProps {
  parentId: string;
}
export const notionConductC1Meeting = ({
  parentId,
}: ConductC1MeetingProps) => ({
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
  children: [
    {
      heading_1: {
        rich_text: [
          {
            type: "text",
            text: {
              content: "Meeting",
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
            plain_text: "Meeting",
            href: null,
          },
        ],
        is_toggleable: false,
        color: "default",
      },
    },
    {
      bookmark: {
        caption: [],
        url: "https://www.canva.com/design/DAFqcyTXTx4/CXE-TLbFC_bhkiQIHccc9Q/edit",
      },
    },
    {
      embed: {
        caption: [],
        url: "https://tally.so/r/npAVYb?id=2yozag01r1&name=John",
      },
    },
    {
      heading_1: {
        rich_text: [
          {
            type: "text",
            text: {
              content: "Guideline",
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
            plain_text: "Guideline",
            href: null,
          },
        ],
        is_toggleable: false,
        color: "default",
      },
    },
    {
      heading_3: {
        rich_text: [
          {
            type: "text",
            text: {
              content: "Introduction ",
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
            plain_text: "Introduction ",
            href: null,
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
              content:
                "Hi “(parent/student name)“,  it’s great to meet you today",
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
            plain_text:
              "Hi “(parent/student name)“,  it’s great to meet you today",
            href: null,
          },
          {
            type: "text",
            text: {
              content:
                " (clarify how to pronounce both the student and parent name if you don’t know how to pronounce it) ",
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
            plain_text:
              " (clarify how to pronounce both the student and parent name if you don’t know how to pronounce it) ",
            href: null,
          },
        ],
        checked: false,
        color: "default",
      },
    },
    {
      paragraph: {
        rich_text: [
          {
            type: "text",
            text: {
              content:
                "Once you know how to pronounce their name, transition into the agenda",
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
            plain_text:
              "Once you know how to pronounce their name, transition into the agenda",
            href: null,
          },
        ],
        color: "default",
      },
    },
    {
      to_do: {
        rich_text: [
          {
            type: "text",
            text: {
              content:
                "“I want to make the most out of your time today, so I’ll briefly introduce my background and cover what you can expect from our Accelerator program” ",
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
            plain_text:
              "“I want to make the most out of your time today, so I’ll briefly introduce my background and cover what you can expect from our Accelerator program” ",
            href: null,
          },
        ],
        checked: false,
        color: "default",
      },
    },
    {
      divider: {},
    },
    {
      callout: {
        rich_text: [
          {
            type: "text",
            text: {
              content:
                "Here’s a framework I recommend to follow for introductions:",
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
            plain_text:
              "Here’s a framework I recommend to follow for introductions:",
            href: null,
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
        rich_text: [],
        color: "default",
      },
    },
    {
      paragraph: {
        rich_text: [
          {
            type: "text",
            text: {
              content:
                "Ex. “Hi, my name is John, I’ve helped students secure internships, build successful projects, and edit college applications to help students get into Duke, UCLA, Berkeley, and more. Before we get started, I’d like to give you a better understanding of what we’ll cover in our accelerator program. We offer three calls completely for free, and I’ll explain our main objectives for each meeting: ",
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
            plain_text:
              "Ex. “Hi, my name is John, I’ve helped students secure internships, build successful projects, and edit college applications to help students get into Duke, UCLA, Berkeley, and more. Before we get started, I’d like to give you a better understanding of what we’ll cover in our accelerator program. We offer three calls completely for free, and I’ll explain our main objectives for each meeting: ",
            href: null,
          },
        ],
        color: "default",
      },
    },
    {
      to_do: {
        rich_text: [
          {
            type: "text",
            text: {
              content: "Meeting 1: we help families",
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
            plain_text: "Meeting 1: we help families",
            href: null,
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
            plain_text: " ",
            href: null,
          },
          {
            type: "text",
            text: {
              content:
                "understand strategies for standing out in the admissions process. ",
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
            plain_text:
              "understand strategies for standing out in the admissions process. ",
            href: null,
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
              content:
                "Meeting 2: we will work individually with your student. By doing so, we can address any areas that could add the most value to their applications. ",
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
            plain_text:
              "Meeting 2: we will work individually with your student. By doing so, we can address any areas that could add the most value to their applications. ",
            href: null,
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
              content:
                "Meeting 3: we’ll create a free resource that’s tailored to ",
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
            plain_text:
              "Meeting 3: we’ll create a free resource that’s tailored to ",
            href: null,
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
            plain_text: "(student name’s) ",
            href: null,
          },
          {
            type: "text",
            text: {
              content:
                "needs. You can keep this resource, regardless of whether you continue with our main program. Afterward, we can discuss if you want to move forward with our paid consulting program, where we can discuss our year-round professional services. ",
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
            plain_text:
              "needs. You can keep this resource, regardless of whether you continue with our main program. Afterward, we can discuss if you want to move forward with our paid consulting program, where we can discuss our year-round professional services. ",
            href: null,
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
            plain_text: "“Do you have any questions before we get started?” ",
            href: null,
          },
        ],
        checked: false,
        color: "default",
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
              content: "Transition to Informal Q&A",
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
            plain_text: "Transition to Informal Q&A",
            href: null,
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
              content:
                "“From my experience guiding families through college admissions, I’ve found that we can provide our best advice when we learn more about your background. Would it be fair if I run by a couple questions before we get started with our presentation?”",
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
            plain_text:
              "“From my experience guiding families through college admissions, I’ve found that we can provide our best advice when we learn more about your background. Would it be fair if I run by a couple questions before we get started with our presentation?”",
            href: null,
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
            plain_text: "Ask the student:",
            href: null,
          },
          {
            type: "text",
            text: {
              content:
                " How do you generally spend your time outside of school? Any clubs, leadership positions, internships, competitions, interesting projects you’ve built on the side” ",
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
            plain_text:
              " How do you generally spend your time outside of school? Any clubs, leadership positions, internships, competitions, interesting projects you’ve built on the side” ",
            href: null,
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
              content:
                "Most of the time, students leave out important info about their activities: ask follow up questions to make sure they don’t forget anything ",
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
            plain_text:
              "Most of the time, students leave out important info about their activities: ask follow up questions to make sure they don’t forget anything ",
            href: null,
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
              content: "Ask this to obtain more info: ",
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
            plain_text: "Ask this to obtain more info: ",
            href: null,
          },
          {
            type: "text",
            text: {
              content:
                "“Aside from any clubs or competitions you’ve done during school, how have you spend your time during each winter & summer break. We can start with your freshmen year, up until now”.  ",
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
            plain_text:
              "“Aside from any clubs or competitions you’ve done during school, how have you spend your time during each winter & summer break. We can start with your freshmen year, up until now”.  ",
            href: null,
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
              content: "Then, ask the student:",
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
            plain_text: "Then, ask the student:",
            href: null,
          },
          {
            type: "text",
            text: {
              content: " “do you have an idea of what you want to major in”",
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
            plain_text: " “do you have an idea of what you want to major in”",
            href: null,
          },
        ],
        checked: false,
        color: "default",
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
              content:
                "Clarify the family’s  goals + Have them understand why to get help now",
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
            plain_text:
              "Clarify the family’s  goals + Have them understand why to get help now",
            href: null,
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
              content: " Ask the student: ",
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
            plain_text: " Ask the student: ",
            href: null,
          },
          {
            type: "text",
            text: {
              content:
                "What were you hoping to get out of our program? The more we know, the better we can help.” ",
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
            plain_text:
              "What were you hoping to get out of our program? The more we know, the better we can help.” ",
            href: null,
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
              content: "Jot down student’s response. Then, ask the parent ",
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
            plain_text: "Jot down student’s response. Then, ask the parent ",
            href: null,
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
            plain_text: "(address them by their first name)",
            href: null,
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
            plain_text: ": ",
            href: null,
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
            plain_text: "“Was there anything else you wanted us to help ",
            href: null,
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
            plain_text: "(student name)",
            href: null,
          },
          {
            type: "text",
            text: {
              content:
                " with, whether it’s discovering impactful extracurriculars, exploring career interests, learning how to write a unique college essay, or overall strategies for standing out in the application process”",
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
            plain_text:
              " with, whether it’s discovering impactful extracurriculars, exploring career interests, learning how to write a unique college essay, or overall strategies for standing out in the application process”",
            href: null,
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
              content:
                "Keep asking questions until you can identify a specific problem, such as “I don’t know how to edit my essays”, or “I don’t know how whether I’m doing the best activities right now” (Your goal should pick the biggest problems they are struggling with, help them understand why their current alternatives to solving this problem haven’t worked, and why we’re best positioned to help them)",
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
            plain_text:
              "Keep asking questions until you can identify a specific problem, such as “I don’t know how to edit my essays”, or “I don’t know how whether I’m doing the best activities right now” (Your goal should pick the biggest problems they are struggling with, help them understand why their current alternatives to solving this problem haven’t worked, and why we’re best positioned to help them)",
            href: null,
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
              content: "Use this Follow up question",
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
            plain_text: "Use this Follow up question",
            href: null,
          },
          {
            type: "text",
            text: {
              content:
                ": “So you mentioned you wanted to us to offer some advice for ",
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
            plain_text:
              ": “So you mentioned you wanted to us to offer some advice for ",
            href: null,
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
            plain_text: "(insert problem they mentioned),",
            href: null,
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
            plain_text: " what have you previously done to try to solve this",
            href: null,
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
            plain_text: " ",
            href: null,
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
            plain_text: "on your own” ",
            href: null,
          },
          {
            type: "text",
            text: {
              content:
                "(you want to insert the specific problem they bring up here)",
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
            plain_text:
              "(you want to insert the specific problem they bring up here)",
            href: null,
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
              content:
                "Then follow up with: “Why do you feel like now is the best time for us to help you…… ” (",
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
            plain_text:
              "Then follow up with: “Why do you feel like now is the best time for us to help you…… ” (",
            href: null,
          },
          {
            type: "text",
            text: {
              content:
                "you want to insert what outcome they want, whether it’s preparing to get into a good school, learning valuable project-building skills, discovering their career interests, etc)",
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
            plain_text:
              "you want to insert what outcome they want, whether it’s preparing to get into a good school, learning valuable project-building skills, discovering their career interests, etc)",
            href: null,
          },
        ],
        checked: false,
        color: "default",
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
        rich_text: [
          {
            type: "text",
            text: {
              content:
                "Take notes of these responses: it will help you tailor the presentation to the family, and it will also save you time when you transcribe information to the CRM",
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
            plain_text:
              "Take notes of these responses: it will help you tailor the presentation to the family, and it will also save you time when you transcribe information to the CRM",
            href: null,
          },
        ],
        color: "default",
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
              content: "Presentation ",
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
            plain_text: "Presentation ",
            href: null,
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
              content: "Ask for specific questions or concerns they might have",
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
            plain_text:
              "Ask for specific questions or concerns they might have",
            href: null,
          },
        ],
        checked: false,
        color: "default",
      },
    },
    {
      divider: {},
    },
    {
      heading_1: {
        rich_text: [
          {
            type: "text",
            text: {
              content: "Post-Presentation Logistics",
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
            plain_text: "Post-Presentation Logistics",
            href: null,
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
              content:
                "Two main components:\n1. Create Student/Parent GC & send Tally Forms\n2. Schedule C2/C3 – Try your best to get these calls scheduled on the C1 meeting itself",
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
            plain_text:
              "Two main components:\n1. Create Student/Parent GC & send Tally Forms\n2. Schedule C2/C3 – Try your best to get these calls scheduled on the C1 meeting itself",
            href: null,
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
              content: "Create Student/Parent GC",
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
            plain_text: "Create Student/Parent GC",
            href: null,
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
              content: "Ask for parent & student phone number and email",
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
            plain_text: "Ask for parent & student phone number and email",
            href: null,
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
              content:
                "Make a student/parent gc after collecting their phone numbers:",
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
            plain_text:
              "Make a student/parent gc after collecting their phone numbers:",
            href: null,
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
              content: "Schedule C3 with parent, and C2 with student",
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
            plain_text: "Schedule C3 with parent, and C2 with student",
            href: null,
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
              content:
                "Send parent the following intake form: Let them know this is optional but the more info they provide us – the more we can help them",
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
            plain_text:
              "Send parent the following intake form: Let them know this is optional but the more info they provide us – the more we can help them",
            href: null,
          },
        ],
        checked: false,
        color: "default",
      },
    },
    {
      divider: {},
    },
    {
      paragraph: {
        rich_text: [],
        color: "default",
      },
    },
  ],
});
