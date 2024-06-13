import fs from "fs";
import {
  CHILDREN_DIRECTORY,
  HEADING_DIRECTORY,
  PARENT_ID_PLACEHOLDER,
} from "../constants";
import { generate, getOutputTitle } from "./generate";

const getHeadingJson = (pageId: string) => {
  try {
    const headingData = fs.readFileSync(
      `${HEADING_DIRECTORY}${pageId}.json`,
      "utf8"
    );
    return JSON.parse(headingData);
  } catch (error) {
    throw new Error("Error generating template");
  }
};
const getChildrenJson = (pageId: string) => {
  try {
    // children directory uses pageId as subfolder name
    // not very maintainable pattern, but literally do not care
    const childrenData = fs.readFileSync(
      `${CHILDREN_DIRECTORY}${pageId}/${pageId}.json`,
      "utf8"
    );
    return JSON.parse(childrenData);
  } catch (error) {
    throw new Error("Error generating template");
  }
};

export const generatePageTemplate = async (pageId: string) => {
  const headingJson = getHeadingJson(pageId);
  const childrenJson = getChildrenJson(pageId);
  const title = getOutputTitle(headingJson, "properties.title.0.text.content");

  const functionName = `generate${title
    .replace(/[^\w\s]/gi, "")
    .replace(/\s+/g, "")}Page`;

  const propName =
    functionName.charAt(0).toUpperCase() + functionName.slice(1) + "Props";

  const functionContent = `
      import { notion } from "../utils/notion";

      interface ${propName} {
        parentId: string;
      }
      export const ${functionName} = async ({ parentId }: ${propName}) => {
        const res = await notion.pages.create({
          "parent": ${JSON.stringify(
            // set placeholder to parentId variable
            headingJson.parent,
            (_key, value) =>
              value === PARENT_ID_PLACEHOLDER ? "{parentId}" : value,
            2
          ).replace('"{parentId}"', "parentId")},
          "icon": ${JSON.stringify(headingJson.icon, null, 2)},
          "properties": ${JSON.stringify(headingJson.properties, null, 2)},
        });
        return await notion.blocks.children.append({
          "block_id": res.id,
          "children": ${JSON.stringify(childrenJson, null, 2)}
        });
      }
      `;

  generate({
    functionName,
    functionContent,
  });
};
