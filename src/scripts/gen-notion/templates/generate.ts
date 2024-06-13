import path from "path";
import fs from "fs";
import { CHILDREN_DIRECTORY, TEMPLATE_DIRECTORY } from "../constants";
import { createOutput } from "../outputs/create";

export const getOutputTitle = (outputJson: any, path: string) => {
  const getNestedProperty = (obj: any, path: string): any =>
    path.split(".").reduce((acc, part) => acc && acc[part], obj);

  const title = getNestedProperty(outputJson, path);
  if (!title) throw new Error("Title not found in output.json");
  return title as string;
};

// bfs through src/output/children to generate notion block functions
export const generateChildren = async (pageId: string) => {
  let res = "";

  const queue = [`${CHILDREN_DIRECTORY}${pageId}/`];

  while (queue.length > 0) {
    const currentPath = queue.shift();
    if (!currentPath) continue;

    // const parentDirectoryId = path.basename(path.dirname(currentPath));
    // const directoryId = path.basename(currentPath);

    // Read the contents of the current directory
    const children = fs.readdirSync(currentPath);
    for (const child of children) {
      const childPath = path.join(currentPath, child);
      const stats = fs.statSync(childPath);

      if (stats.isDirectory()) {
        queue.push(childPath);
      } else {
        const currentFile = path.basename(childPath);
        // skip the first file since we already generated it
        if (currentFile === `${pageId}.json`) break;

        const currentData = fs.readFileSync(childPath, "utf8");
        const currentJson = JSON.parse(currentData);

        // WRONG
        res += `
          res = await notion.blocks.children.append({
            "block_id": res.results[0].id,
            "children": ${JSON.stringify(currentJson.children, null, 2)}
          });
          `;
      }
    }
  }

  return res;
};

interface generateTemplateProps {
  functionName: string;
  functionContent: string;
}
export const generate = async ({
  functionName,
  functionContent,
}: generateTemplateProps) => {
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
