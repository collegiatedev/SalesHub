// import {
//   ACCELERATOR_TASKS_DB,
//   CONDUCT_C2_MEETING_PB_TASK,
// } from "../../utils/constants";
// import { notionClient } from "../../utils/clients";
// import { RequiredTaskFields } from "../utils/requiredTaskFields";
// import { addTaskProperties } from "../utils/shared";

// export interface GenConductC2MeetingPersonalBrandInDatabaseProps
//   extends RequiredTaskFields {
//   docLink: string;
//   fileLink: string;
// }
// export const genConductC2MeetingPersonalBrandInDatabase = async ({
//   studentName,
//   studentPageId,
//   repPageId,
//   docLink,
//   fileLink,
// }: GenConductC2MeetingPersonalBrandInDatabaseProps) => {
//   const keyMap = new Map<string, Array<any>>();
//   const page = await notionClient.pages.create({
//     parent: {
//       type: "database_id",
//       database_id: ACCELERATOR_TASKS_DB,
//     },
//     icon: {
//       type: "emoji",
//       emoji: "✨",
//     },
//     properties: {
//       ...addTaskProperties({
//         studentName,
//         studentPageId,
//         repPageId,
//         taskName: "Conduct C2 Meeting - Personal Brand",
//         taskId: CONDUCT_C2_MEETING_PB_TASK,
//       }),
//     },
//   });
//   let res = await notionClient.blocks.children.append({
//     block_id: page.id,
//     children: [
//       {
//         heading_1: {
//           rich_text: [
//             {
//               type: "text",
//               text: {
//                 content: "Introduction",
//                 link: null,
//               },
//               annotations: {
//                 bold: false,
//                 italic: false,
//                 strikethrough: false,
//                 underline: false,
//                 code: false,
//                 color: "default",
//               },
//             },
//           ],
//           is_toggleable: true,
//           color: "default",
//         },
//       },
//       {
//         heading_1: {
//           rich_text: [
//             {
//               type: "text",
//               text: {
//                 content: "During",
//                 link: null,
//               },
//               annotations: {
//                 bold: false,
//                 italic: false,
//                 strikethrough: false,
//                 underline: false,
//                 code: false,
//                 color: "default",
//               },
//             },
//           ],
//           is_toggleable: true,
//           color: "default",
//         },
//       },
//       {
//         heading_1: {
//           rich_text: [
//             {
//               type: "text",
//               text: {
//                 content: "After",
//                 link: null,
//               },
//               annotations: {
//                 bold: false,
//                 italic: false,
//                 strikethrough: false,
//                 underline: false,
//                 code: false,
//                 color: "default",
//               },
//             },
//           ],
//           is_toggleable: false,
//           color: "default",
//         },
//       },
//       {
//         callout: {
//           rich_text: [
//             {
//               type: "text",
//               text: {
//                 content: "Complete this form after the call ",
//                 link: null,
//               },
//               annotations: {
//                 bold: false,
//                 italic: false,
//                 strikethrough: false,
//                 underline: false,
//                 code: false,
//                 color: "default",
//               },
//             },
//             {
//               type: "text",
//               text: {
//                 content: "(MANDATORY)",
//                 link: null,
//               },
//               annotations: {
//                 bold: true,
//                 italic: false,
//                 strikethrough: false,
//                 underline: false,
//                 code: false,
//                 color: "default",
//               },
//             },
//           ],
//           icon: {
//             type: "emoji",
//             emoji: "⬇️",
//           },
//           color: "gray_background",
//         },
//       },
//       {
//         embed: {
//           caption: [
//             {
//               type: "text",
//               text: {
//                 content: "You can also find the link in Accelerator Tasks\n",
//                 link: null,
//               },
//               annotations: {
//                 bold: false,
//                 italic: false,
//                 strikethrough: false,
//                 underline: false,
//                 code: false,
//                 color: "default",
//               },
//             },
//           ],
//           url: "https://tally.so/r/npAVYb?id=2yozag01r1&name=John",
//         },
//       },
//       {
//         paragraph: {
//           rich_text: [],
//           color: "default",
//         },
//       },
//     ],
//   });
//   keyMap.set("29d8e847ce87449988c992015b46a7a6", res.results);

//   let promises = [];

//   promises.push(
//     (async () => {
//       const res = await notionClient.blocks.children.append({
//         block_id: keyMap.get("29d8e847ce87449988c992015b46a7a6")![0].id,
//         children: [
//           {
//             to_do: {
//               rich_text: [
//                 {
//                   type: "text",
//                   text: {
//                     content: "Check the “Post-C1 Debrief” under ",
//                     link: null,
//                   },
//                   annotations: {
//                     bold: false,
//                     italic: false,
//                     strikethrough: false,
//                     underline: false,
//                     code: false,
//                     color: "default",
//                   },
//                 },
//                 {
//                   type: "mention",
//                   mention: {
//                     database: {
//                       id: "755c7b99-ddc7-4354-9ce5-4868218d8588",
//                     },
//                   },
//                   annotations: {
//                     bold: false,
//                     italic: false,
//                     strikethrough: false,
//                     underline: false,
//                     code: false,
//                     color: "default",
//                   },
//                 },
//                 {
//                   type: "text",
//                   text: {
//                     content: " for name pronunciation ",
//                     link: null,
//                   },
//                   annotations: {
//                     bold: false,
//                     italic: false,
//                     strikethrough: false,
//                     underline: false,
//                     code: false,
//                     color: "default",
//                   },
//                 },
//               ],
//               checked: false,
//               color: "default",
//             },
//           },
//           {
//             to_do: {
//               rich_text: [
//                 {
//                   type: "text",
//                   text: {
//                     content: "Wait for student to join the call",
//                     link: null,
//                   },
//                   annotations: {
//                     bold: false,
//                     italic: false,
//                     strikethrough: false,
//                     underline: false,
//                     code: false,
//                     color: "default",
//                   },
//                 },
//               ],
//               checked: false,
//               color: "default",
//             },
//           },
//           {
//             to_do: {
//               rich_text: [
//                 {
//                   type: "text",
//                   text: {
//                     content:
//                       "Once you’re ready to start, say “I want to make the most out of your time today, so I’ll briefly introduce my background”",
//                     link: null,
//                   },
//                   annotations: {
//                     bold: false,
//                     italic: false,
//                     strikethrough: false,
//                     underline: false,
//                     code: false,
//                     color: "default",
//                   },
//                 },
//               ],
//               checked: false,
//               color: "default",
//             },
//           },
//           {
//             to_do: {
//               rich_text: [
//                 {
//                   type: "text",
//                   text: {
//                     content: "Explain your background (",
//                     link: null,
//                   },
//                   annotations: {
//                     bold: false,
//                     italic: false,
//                     strikethrough: false,
//                     underline: false,
//                     code: false,
//                     color: "default",
//                   },
//                 },
//                 {
//                   type: "text",
//                   text: {
//                     content: "Name",
//                     link: null,
//                   },
//                   annotations: {
//                     bold: false,
//                     italic: false,
//                     strikethrough: false,
//                     underline: false,
//                     code: false,
//                     color: "red_background",
//                   },
//                 },
//                 {
//                   type: "text",
//                   text: {
//                     content: " → ",
//                     link: null,
//                   },
//                   annotations: {
//                     bold: false,
//                     italic: false,
//                     strikethrough: false,
//                     underline: false,
//                     code: false,
//                     color: "default",
//                   },
//                 },
//                 {
//                   type: "text",
//                   text: {
//                     content: "Experience",
//                     link: null,
//                   },
//                   annotations: {
//                     bold: false,
//                     italic: false,
//                     strikethrough: false,
//                     underline: false,
//                     code: false,
//                     color: "green_background",
//                   },
//                 },
//                 {
//                   type: "text",
//                   text: {
//                     content: " → ",
//                     link: null,
//                   },
//                   annotations: {
//                     bold: false,
//                     italic: false,
//                     strikethrough: false,
//                     underline: false,
//                     code: false,
//                     color: "default",
//                   },
//                 },
//                 {
//                   type: "text",
//                   text: {
//                     content: "Impact",
//                     link: null,
//                   },
//                   annotations: {
//                     bold: false,
//                     italic: false,
//                     strikethrough: false,
//                     underline: false,
//                     code: false,
//                     color: "blue_background",
//                   },
//                 },
//                 {
//                   type: "text",
//                   text: {
//                     content: " → ",
//                     link: null,
//                   },
//                   annotations: {
//                     bold: false,
//                     italic: false,
//                     strikethrough: false,
//                     underline: false,
//                     code: false,
//                     color: "default",
//                   },
//                 },
//                 {
//                   type: "text",
//                   text: {
//                     content: "Ask",
//                     link: null,
//                   },
//                   annotations: {
//                     bold: false,
//                     italic: false,
//                     strikethrough: false,
//                     underline: false,
//                     code: false,
//                     color: "purple_background",
//                   },
//                 },
//                 {
//                   type: "text",
//                   text: {
//                     content: ")",
//                     link: null,
//                   },
//                   annotations: {
//                     bold: false,
//                     italic: false,
//                     strikethrough: false,
//                     underline: false,
//                     code: false,
//                     color: "default",
//                   },
//                 },
//               ],
//               checked: false,
//               color: "default",
//             },
//           },
//         ],
//       });
//       keyMap.set("2a05e3e2-e487-4c13-b716-9923eaafbd64", res.results);
//       console.log("Created: 2a05e3e2-e487-4c13-b716-9923eaafbd64");
//     })()
//   );

//   promises.push(
//     (async () => {
//       const res = await notionClient.blocks.children.append({
//         block_id: keyMap.get("29d8e847ce87449988c992015b46a7a6")![1].id,
//         children: [
//           {
//             heading_3: {
//               rich_text: [
//                 {
//                   type: "text",
//                   text: {
//                     content: "Activity",
//                     link: null,
//                   },
//                   annotations: {
//                     bold: false,
//                     italic: false,
//                     strikethrough: false,
//                     underline: false,
//                     code: false,
//                     color: "default",
//                   },
//                 },
//               ],
//               is_toggleable: false,
//               color: "default",
//             },
//           },
//           {
//             numbered_list_item: {
//               rich_text: [
//                 {
//                   type: "text",
//                   text: {
//                     content:
//                       "Open up this doc and send the link into the Zoom chat. The doc is already shared with the student:",
//                     link: null,
//                   },
//                   annotations: {
//                     bold: false,
//                     italic: false,
//                     strikethrough: false,
//                     underline: false,
//                     code: false,
//                     color: "default",
//                   },
//                 },
//               ],
//               color: "default",
//             },
//           },
//           {
//             numbered_list_item: {
//               rich_text: [
//                 {
//                   type: "text",
//                   text: {
//                     content:
//                       "Ask the student the questions on the doc, and type out their responses",
//                     link: null,
//                   },
//                   annotations: {
//                     bold: false,
//                     italic: false,
//                     strikethrough: false,
//                     underline: false,
//                     code: false,
//                     color: "default",
//                   },
//                 },
//               ],
//               color: "default",
//             },
//           },
//           {
//             heading_3: {
//               rich_text: [
//                 {
//                   type: "text",
//                   text: {
//                     content: "Wrapping Up",
//                     link: null,
//                   },
//                   annotations: {
//                     bold: false,
//                     italic: false,
//                     strikethrough: false,
//                     underline: false,
//                     code: false,
//                     color: "default",
//                   },
//                 },
//               ],
//               is_toggleable: false,
//               color: "default",
//             },
//           },
//           {
//             bulleted_list_item: {
//               rich_text: [
//                 {
//                   type: "text",
//                   text: {
//                     content:
//                       "“It was great working with you, and developing a really compelling personal brand is not an overnight process—so it’s perfectly normal if we haven’t finalized everything yet. I’ll provide suggestions to improve your document and give you an example of a completed brand guide in your next meeting”",
//                     link: null,
//                   },
//                   annotations: {
//                     bold: false,
//                     italic: false,
//                     strikethrough: false,
//                     underline: false,
//                     code: false,
//                     color: "default",
//                   },
//                 },
//               ],
//               color: "default",
//             },
//           },
//           {
//             bulleted_list_item: {
//               rich_text: [
//                 {
//                   type: "text",
//                   text: {
//                     content:
//                       "“I also wanted to confirm if you were able to schedule your third call with us with  one of your parents also being able to attend” ",
//                     link: null,
//                   },
//                   annotations: {
//                     bold: false,
//                     italic: false,
//                     strikethrough: false,
//                     underline: false,
//                     code: false,
//                     color: "default",
//                   },
//                 },
//               ],
//               color: "default",
//             },
//           },
//         ],
//       });
//       keyMap.set("a4f4e205-6faf-4977-b10f-a7a72e8bb187", res.results);
//       console.log("Created: a4f4e205-6faf-4977-b10f-a7a72e8bb187");
//     })()
//   );

//   await Promise.all(promises);
//   console.log("Done with batch");
//   promises = [];

//   promises.push(
//     (async () => {
//       const res = await notionClient.blocks.children.append({
//         block_id: keyMap.get("2a05e3e2-e487-4c13-b716-9923eaafbd64")![1].id,
//         children: [
//           {
//             bulleted_list_item: {
//               rich_text: [
//                 {
//                   type: "text",
//                   text: {
//                     content:
//                       "Request that they turn on their camera if it is off",
//                     link: null,
//                   },
//                   annotations: {
//                     bold: false,
//                     italic: false,
//                     strikethrough: false,
//                     underline: false,
//                     code: false,
//                     color: "default",
//                   },
//                 },
//               ],
//               color: "default",
//             },
//           },
//           {
//             bulleted_list_item: {
//               rich_text: [
//                 {
//                   type: "text",
//                   text: {
//                     content: "Confirm that audio works for both sides",
//                     link: null,
//                   },
//                   annotations: {
//                     bold: false,
//                     italic: false,
//                     strikethrough: false,
//                     underline: false,
//                     code: false,
//                     color: "default",
//                   },
//                 },
//               ],
//               color: "default",
//             },
//           },
//         ],
//       });
//       keyMap.set("aa2e61e0-e67f-4047-a1fc-09eaee246a80", res.results);
//       console.log("Created: aa2e61e0-e67f-4047-a1fc-09eaee246a80");
//     })()
//   );

//   promises.push(
//     (async () => {
//       const res = await notionClient.blocks.children.append({
//         block_id: keyMap.get("2a05e3e2-e487-4c13-b716-9923eaafbd64")![3].id,
//         children: [
//           {
//             bulleted_list_item: {
//               rich_text: [
//                 {
//                   type: "text",
//                   text: {
//                     content: "ex: ",
//                     link: null,
//                   },
//                   annotations: {
//                     bold: false,
//                     italic: false,
//                     strikethrough: false,
//                     underline: false,
//                     code: false,
//                     color: "default",
//                   },
//                 },
//                 {
//                   type: "text",
//                   text: {
//                     content: "My name is Jesse,",
//                     link: null,
//                   },
//                   annotations: {
//                     bold: false,
//                     italic: false,
//                     strikethrough: false,
//                     underline: false,
//                     code: false,
//                     color: "red_background",
//                   },
//                 },
//                 {
//                   type: "text",
//                   text: {
//                     content: " ",
//                     link: null,
//                   },
//                   annotations: {
//                     bold: false,
//                     italic: false,
//                     strikethrough: false,
//                     underline: false,
//                     code: false,
//                     color: "default",
//                   },
//                 },
//                 {
//                   type: "text",
//                   text: {
//                     content: "I’m a current junior studying CS at UIUC.",
//                     link: null,
//                   },
//                   annotations: {
//                     bold: false,
//                     italic: false,
//                     strikethrough: false,
//                     underline: false,
//                     code: false,
//                     color: "green_background",
//                   },
//                 },
//                 {
//                   type: "text",
//                   text: {
//                     content: " ",
//                     link: null,
//                   },
//                   annotations: {
//                     bold: false,
//                     italic: false,
//                     strikethrough: false,
//                     underline: false,
//                     code: false,
//                     color: "default",
//                   },
//                 },
//                 {
//                   type: "text",
//                   text: {
//                     content:
//                       "As a mentor at Collegiate, I’ve guided students through the application process—specifically to help them develop a unique personal brand.",
//                     link: null,
//                   },
//                   annotations: {
//                     bold: false,
//                     italic: false,
//                     strikethrough: false,
//                     underline: false,
//                     code: false,
//                     color: "blue_background",
//                   },
//                 },
//                 {
//                   type: "text",
//                   text: {
//                     content: " ",
//                     link: null,
//                   },
//                   annotations: {
//                     bold: false,
//                     italic: false,
//                     strikethrough: false,
//                     underline: false,
//                     code: false,
//                     color: "default",
//                   },
//                 },
//                 {
//                   type: "text",
//                   text: {
//                     content:
//                       "Before we get started, can I ask you why you were interested in working on this module specifically?",
//                     link: null,
//                   },
//                   annotations: {
//                     bold: false,
//                     italic: false,
//                     strikethrough: false,
//                     underline: false,
//                     code: false,
//                     color: "purple_background",
//                   },
//                 },
//               ],
//               color: "default",
//             },
//           },
//           {
//             bulleted_list_item: {
//               rich_text: [
//                 {
//                   type: "text",
//                   text: {
//                     content:
//                       "Respond with: “That’s perfect, I’ve helped multiple students with ",
//                     link: null,
//                   },
//                   annotations: {
//                     bold: false,
//                     italic: false,
//                     strikethrough: false,
//                     underline: false,
//                     code: false,
//                     color: "default",
//                   },
//                 },
//                 {
//                   type: "text",
//                   text: {
//                     content: "<insert the reason they gave>",
//                     link: null,
//                   },
//                   annotations: {
//                     bold: true,
//                     italic: false,
//                     strikethrough: false,
//                     underline: false,
//                     code: false,
//                     color: "default",
//                   },
//                 },
//                 {
//                   type: "text",
//                   text: {
//                     content:
//                       ", and I can get you started right now with this today’s exercise”",
//                     link: null,
//                   },
//                   annotations: {
//                     bold: false,
//                     italic: false,
//                     strikethrough: false,
//                     underline: false,
//                     code: false,
//                     color: "default",
//                   },
//                 },
//               ],
//               color: "default",
//             },
//           },
//         ],
//       });
//       keyMap.set("edf98baa-73ac-4d20-a07a-00510625aff4", res.results);
//       console.log("Created: edf98baa-73ac-4d20-a07a-00510625aff4");
//     })()
//   );

//   promises.push(
//     (async () => {
//       const res = await notionClient.blocks.children.append({
//         block_id: keyMap.get("a4f4e205-6faf-4977-b10f-a7a72e8bb187")![1].id,
//         children: [
//           {
//             bookmark: {
//               caption: [],
//               url: "https://chatgpt.com/",
//             },
//           },
//         ],
//       });
//       keyMap.set("0746065f-8930-4b67-a015-7a2287bda4ee", res.results);
//       console.log("Created: 0746065f-8930-4b67-a015-7a2287bda4ee");
//     })()
//   );

//   promises.push(
//     (async () => {
//       const res = await notionClient.blocks.children.append({
//         block_id: keyMap.get("a4f4e205-6faf-4977-b10f-a7a72e8bb187")![2].id,
//         children: [
//           {
//             callout: {
//               rich_text: [
//                 {
//                   type: "text",
//                   text: {
//                     content: "Use ",
//                     link: null,
//                   },
//                   annotations: {
//                     bold: false,
//                     italic: false,
//                     strikethrough: false,
//                     underline: false,
//                     code: false,
//                     color: "default",
//                   },
//                 },
//                 {
//                   type: "mention",
//                   mention: {
//                     page: {
//                       id: "55daf4db-3278-43c6-9618-01ef002ff616",
//                     },
//                   },
//                   annotations: {
//                     bold: false,
//                     italic: false,
//                     strikethrough: false,
//                     underline: false,
//                     code: false,
//                     color: "default",
//                   },
//                 },
//               ],
//               icon: {
//                 type: "emoji",
//                 emoji: "💡",
//               },
//               color: "gray_background",
//             },
//           },
//         ],
//       });
//       keyMap.set("101e1151-d460-4c5b-bd45-551e247d66a1", res.results);
//       console.log("Created: 101e1151-d460-4c5b-bd45-551e247d66a1");
//     })()
//   );

//   await Promise.all(promises);
//   console.log("Done with batch");
//   promises = [];
// };
