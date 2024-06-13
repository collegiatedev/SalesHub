// notion pageId as script argument
const args = process.argv.slice(2);
if (args.length === 0)
  throw new Error("Argument missing: Please provide an argument.");
const arg: string = args[0];

import "dotenv/config";
import fs from "fs";
import path from "path";

import { REQUEST_DIRECTORY, TEMPLATE_DIRECTORY } from "./constants";
import { outputHeading } from "./outputs/heading";
import { outputChildren } from "./outputs/children";
import { outputRequest } from "./outputs/request";

const generateTemplate = async (pageId: string) => {
  try {
    const outputData = fs.readFileSync(
      `${REQUEST_DIRECTORY}${pageId}.json`,
      "utf8"
    );
    const outputJson = JSON.parse(outputData);

    // Extract the title from the JSON content
    const title = outputJson.properties?.Name?.title?.[0]?.text?.content;
    if (!title) {
      throw new Error("Title not found in output.json");
    }

    // Create a valid function name based on the title
    const functionName = `notion${title
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "")}`;

    const propName =
      functionName.charAt(0).toUpperCase() + functionName.slice(1) + "Props";

    // Define the function content
    const functionContent = `
interface ${propName} {
  parentId: string;
}
export const ${functionName} = ({ parentId }: ${propName}) => ({
  "parent": {
    "type": "database_id",
    "database_id": parentId,
  },
  "icon": ${JSON.stringify(outputJson.icon, null, 2)},
  "properties": ${JSON.stringify(outputJson.properties, null, 2)},
  "children": ${JSON.stringify(outputJson.children, null, 2)}
});
`;

    // Ensure the templates directory exists
    if (!fs.existsSync(TEMPLATE_DIRECTORY)) {
      fs.mkdirSync(TEMPLATE_DIRECTORY, { recursive: true });
    }

    // Write the function to a new TypeScript file
    const filePath = path.join(TEMPLATE_DIRECTORY, `${functionName}.ts`);

    // if (fs.existsSync(filePath)) {
    //   console.log(`Template function already exists at ${filePath}`);
    //   return;
    // }

    fs.writeFileSync(filePath, functionContent.trim(), "utf8");
    console.log(`Template function has been saved to ${filePath}`);
  } catch (error) {
    console.error("Error generating template:", error);
  }
};

const main = async () => {
  await outputHeading(arg);
  await outputChildren(arg);
  await outputRequest(arg);
  // src/templates/notion<PageTitle>.ts
  await generateTemplate(arg);
};

main().catch((err) => console.log(err));
