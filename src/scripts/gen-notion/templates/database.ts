import fs from "fs";
import {
  CHILDREN_DIRECTORY,
  HEADING_DIRECTORY,
  PARENT_ID_PLACEHOLDER,
} from "../constants";
import { generate, generateChildren, getOutputTitle } from "./generate";

const getOutputJson = (pageId: string) => {
  try {
    const headingData = fs.readFileSync(
      `${HEADING_DIRECTORY}${pageId}.json`,
      "utf8"
    );
    const headingJson = JSON.parse(headingData);

    // children directory uses pageId as subfolder name
    // not very maintainable pattern, but literally do not care
    const contentData = fs.readFileSync(
      `${CHILDREN_DIRECTORY}${pageId}/${pageId}/${pageId}.json`,
      "utf8"
    );
    const contentJson = JSON.parse(contentData);

    return {
      ...headingJson,
      children: contentJson,
    };
  } catch (error) {
    throw new Error("Error generating template");
  }
};

export const generateDatabaseTemplate = async (pageId: string) => {
  const outputJson = getOutputJson(pageId);
  const title = getOutputTitle(
    outputJson,
    "properties.Name.title.0.text.content"
  );

  const functionName = `generate${title
    .replace(/[^\w\s]/gi, "")
    .replace(/\s+/g, "")}Database`;

  const propName =
    functionName.charAt(0).toUpperCase() + functionName.slice(1) + "Props";

  const functionContent = `
      import { notion } from "../utils/notion";

      interface ${propName} {
        parentId: string;
      }
      export const ${functionName} = async ({ parentId }: ${propName}) => {
        let res = await notion.pages.create({
          "parent": ${JSON.stringify(
            // set placeholder to parentId variable
            outputJson.parent,
            (_key, value) =>
              value === PARENT_ID_PLACEHOLDER ? "{parentId}" : value,
            2
          ).replace('"{parentId}"', "parentId")},
          "icon": ${JSON.stringify(outputJson.icon, null, 2)},
          "properties": ${JSON.stringify(outputJson.properties, null, 2)},
          "children": ${JSON.stringify(outputJson.children, null, 2)}
        });
        ${await generateChildren(pageId)}
      }
      `;

  generate({
    functionName,
    functionContent,
  });
};
