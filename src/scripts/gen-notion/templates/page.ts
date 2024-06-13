// import { PARENT_ID_PLACEHOLDER } from "../constants";
// import { generate, getOutputJson, getOutputTitle } from "./generate";

// export const generatePageTemplate = async (pageId: string) => {
//   const outputJson = getOutputJson(pageId);
//   const title = getOutputTitle(outputJson, "properties.title.0.text.content");

//   const functionName = `generate${title
//     .replace(/[^\w\s]/gi, "")
//     .replace(/\s+/g, "")}Page`;

//   const propName =
//     functionName.charAt(0).toUpperCase() + functionName.slice(1) + "Props";

//   const functionContent = `
//       interface ${propName} {
//         parentId: string;
//       }
//       export const ${functionName} = ({ parentId }: ${propName}) => ({
//         "parent": ${JSON.stringify(
//           // set placeholder to parentId variable
//           outputJson.parent,
//           (_key, value) =>
//             value === PARENT_ID_PLACEHOLDER ? "{parentId}" : value,
//           2
//         ).replace('"{parentId}"', "parentId")},
//         "icon": ${JSON.stringify(outputJson.icon, null, 2)},
//         "properties": ${JSON.stringify(outputJson.properties, null, 2)},
//         "children": ${JSON.stringify(outputJson.children, null, 2)}
//       });
//       `;

//   generate({
//     functionName,
//     functionContent,
//   });
// };
