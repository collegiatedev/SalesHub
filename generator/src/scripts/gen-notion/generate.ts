import path from "path";
import fs from "fs";
import {
  HEADING_DIRECTORY,
  CHILDREN_DIRECTORY,
  PARENT_ID_PLACEHOLDER,
  TEMPLATE_DIRECTORY,
} from "./constants";

// helpers
const getOutputJson = (pageId: string) => {
  try {
    const headingData = fs.readFileSync(
      `${HEADING_DIRECTORY}${pageId}.json`,
      "utf8"
    );
    const headingJson = JSON.parse(headingData);

    // children directory uses pageId as subfolder name
    // not very maintainable pattern, but literally do not care
    const childrenData = fs.readFileSync(
      `${CHILDREN_DIRECTORY}${pageId}/${pageId}/${pageId}.json`,
      "utf8"
    );
    const childrenJson = JSON.parse(childrenData);

    return { headingJson, childrenJson };
  } catch (error) {
    throw new Error("Error generating template");
  }
};
const getOutputFunctionName = (pageId: string, path: string) => {
  const { headingJson } = getOutputJson(pageId);
  const getNestedProperty = (obj: any, path: string): any =>
    path.split(".").reduce((acc, part) => acc && acc[part], obj);

  const title = getNestedProperty(headingJson, path);
  if (!title) throw new Error("Title not found in output.json");
  return `gen${title.replace(/[^\w\s]/gi, "").replace(/\s+/g, "")}`;
};

// bfs through src/output/children to generate notion block functions
const generateChildren = async (pageId: string) => {
  let res = "let promises = []; \n";

  // const queue = [`${CHILDREN_DIRECTORY}${pageId}/`];
  const queue: [string, number][] = [[`${CHILDREN_DIRECTORY}${pageId}`, 0]];
  let currentDepth = 0;

  const callPromise = `
    await Promise.all(promises);
    console.log("Done with batch");
    promises = [];
  `;

  while (queue.length > 0) {
    const next = queue.shift();
    // Type guard to handle the case when queue.shift() returns undefined
    if (!next) continue;
    const [currentPath, depth] = next;

    if (!currentPath) continue;

    // traversing two layers up directories for parent directory
    const parentId = path.basename(path.dirname(path.dirname(currentPath)));

    // Read the contents of the current directory
    const children = fs.readdirSync(currentPath);
    for (const child of children) {
      const childPath = path.join(currentPath, child);
      const stats = fs.statSync(childPath);

      if (stats.isDirectory()) {
        queue.push([childPath, depth + 1]);
      } else {
        const currentId = path.basename(childPath, ".json");
        // // skip the first file since we already generated it
        if (currentId === pageId) break;

        const currentData = fs.readFileSync(childPath, "utf8");
        const currentJson = JSON.parse(currentData);

        // on final object of a layer,
        if (depth !== currentDepth) {
          // ignore the first layer
          if (depth !== 2) res += callPromise;
          currentDepth = depth;
        }
        res += `
        promises.push(
          (async () => {
            const res = await notionClient.blocks.children.append({
              "block_id": keyMap.get("${parentId}")![${
          currentJson.position
        }].id,
              "children": ${JSON.stringify(currentJson.children, null, 2)}
            });
            keyMap.set("${currentId}", res.results);
            console.log("Created: ${currentId}");
          })()
        );
          `;
      }
    }
  }
  // final batch
  res += callPromise;

  return res;
};
// the template code
const generateContent = async (pageId: string, functionName: string) => {
  const { headingJson, childrenJson } = getOutputJson(pageId);

  const propName =
    functionName.charAt(0).toUpperCase() + functionName.slice(1) + "Props";

  return `
      import { notionClient } from "../utils/clients";
      
      export interface ${propName} {
        parentId: string;
      }
      export const ${functionName} = async ({ parentId }: ${propName}) => {
        const keyMap = new Map<string, Array<any>>();
        const page = await notionClient.pages.create({
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
        let res = await notionClient.blocks.children.append({
          "block_id": page.id,
          "children": ${JSON.stringify(childrenJson, null, 2)}
        });
        keyMap.set("${pageId}", res.results);

        ${await generateChildren(pageId)}
      }
      `;
};
// outputs the template file in src/templates
const generateTemplate = async (
  functionName: string,
  functionContent: string
) => {
  try {
    // Ensure the templates directory exists
    if (!fs.existsSync(TEMPLATE_DIRECTORY))
      fs.mkdirSync(TEMPLATE_DIRECTORY, { recursive: true });

    // Write the function to a new TypeScript file
    const filePath = path.join(TEMPLATE_DIRECTORY, `${functionName}.ts`);

    if (fs.existsSync(filePath)) {
      console.log(`Template function already exists at ${filePath}`);
      return;
    }

    fs.writeFileSync(filePath, functionContent.trim(), "utf8");
    console.log(`Template function has been saved to ${filePath}`);
  } catch (error) {
    console.error("Error generating template:", error);
  }
};

// page and database templates
export const generatePageTemplate = async (pageId: string) => {
  const functionName =
    getOutputFunctionName(pageId, "properties.title.0.text.content") + "InPage";
  const functionContent = await generateContent(pageId, functionName);
  await generateTemplate(functionName, functionContent);
};
export const generateDatabaseTemplate = async (pageId: string) => {
  const functionName =
    getOutputFunctionName(pageId, "properties.Name.title.0.text.content") +
    "InDatabase";
  const functionContent = await generateContent(pageId, functionName);
  await generateTemplate(functionName, functionContent);
};
