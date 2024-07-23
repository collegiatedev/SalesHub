"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDatabaseTemplate = exports.generatePageTemplate = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const constants_1 = require("./constants");
// helpers
const getOutputJson = (pageId) => {
    try {
        const headingData = fs_1.default.readFileSync(`${constants_1.HEADING_DIRECTORY}${pageId}.json`, "utf8");
        const headingJson = JSON.parse(headingData);
        // children directory uses pageId as subfolder name
        // not very maintainable pattern, but literally do not care
        const childrenData = fs_1.default.readFileSync(`${constants_1.CHILDREN_DIRECTORY}${pageId}/${pageId}/${pageId}.json`, "utf8");
        const childrenJson = JSON.parse(childrenData);
        return { headingJson, childrenJson };
    }
    catch (error) {
        throw new Error("Error generating template");
    }
};
const getOutputFunctionName = (pageId, path) => {
    const { headingJson } = getOutputJson(pageId);
    const getNestedProperty = (obj, path) => path.split(".").reduce((acc, part) => acc && acc[part], obj);
    const title = getNestedProperty(headingJson, path);
    if (!title)
        throw new Error("Title not found in output.json");
    return `gen${title.replace(/[^\w\s]/gi, "").replace(/\s+/g, "")}`;
};
// bfs through src/output/children to generate notion block functions
const generateChildren = async (pageId) => {
    let res = "let promises = []; \n";
    // const queue = [`${CHILDREN_DIRECTORY}${pageId}/`];
    const queue = [[`${constants_1.CHILDREN_DIRECTORY}${pageId}`, 0]];
    let currentDepth = 0;
    const callPromise = `
    await Promise.all(promises);
    console.log("Done with batch");
    promises = [];
  `;
    while (queue.length > 0) {
        const next = queue.shift();
        // Type guard to handle the case when queue.shift() returns undefined
        if (!next)
            continue;
        const [currentPath, depth] = next;
        if (!currentPath)
            continue;
        // traversing two layers up directories for parent directory
        const parentId = path_1.default.basename(path_1.default.dirname(path_1.default.dirname(currentPath)));
        // Read the contents of the current directory
        const children = fs_1.default.readdirSync(currentPath);
        for (const child of children) {
            const childPath = path_1.default.join(currentPath, child);
            const stats = fs_1.default.statSync(childPath);
            if (stats.isDirectory()) {
                queue.push([childPath, depth + 1]);
            }
            else {
                const currentId = path_1.default.basename(childPath, ".json");
                // // skip the first file since we already generated it
                if (currentId === pageId)
                    break;
                const currentData = fs_1.default.readFileSync(childPath, "utf8");
                const currentJson = JSON.parse(currentData);
                // on final object of a layer,
                if (depth !== currentDepth) {
                    // ignore the first layer
                    if (depth !== 2)
                        res += callPromise;
                    currentDepth = depth;
                }
                res += `
        promises.push(
          (async () => {
            const res = await notionClient.blocks.children.append({
              "block_id": keyMap.get("${parentId}")![${currentJson.position}].id,
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
const generateContent = async (pageId, functionName) => {
    const { headingJson, childrenJson } = getOutputJson(pageId);
    const propName = functionName.charAt(0).toUpperCase() + functionName.slice(1) + "Props";
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
    headingJson.parent, (_key, value) => value === constants_1.PARENT_ID_PLACEHOLDER ? "{parentId}" : value, 2).replace('"{parentId}"', "parentId")},
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
const generateTemplate = async (functionName, functionContent) => {
    try {
        // Ensure the templates directory exists
        if (!fs_1.default.existsSync(constants_1.TEMPLATE_DIRECTORY))
            fs_1.default.mkdirSync(constants_1.TEMPLATE_DIRECTORY, { recursive: true });
        // Write the function to a new TypeScript file
        const filePath = path_1.default.join(constants_1.TEMPLATE_DIRECTORY, `${functionName}.ts`);
        if (fs_1.default.existsSync(filePath)) {
            console.log(`Template function already exists at ${filePath}`);
            return;
        }
        fs_1.default.writeFileSync(filePath, functionContent.trim(), "utf8");
        console.log(`Template function has been saved to ${filePath}`);
    }
    catch (error) {
        console.error("Error generating template:", error);
    }
};
// page and database templates
const generatePageTemplate = async (pageId) => {
    const functionName = getOutputFunctionName(pageId, "properties.title.0.text.content") + "InPage";
    const functionContent = await generateContent(pageId, functionName);
    await generateTemplate(functionName, functionContent);
};
exports.generatePageTemplate = generatePageTemplate;
const generateDatabaseTemplate = async (pageId) => {
    const functionName = getOutputFunctionName(pageId, "properties.Name.title.0.text.content") +
        "InDatabase";
    const functionContent = await generateContent(pageId, functionName);
    await generateTemplate(functionName, functionContent);
};
exports.generateDatabaseTemplate = generateDatabaseTemplate;
