// notion pageId as script argument
const args = process.argv.slice(2);
if (args.length === 0)
  throw new Error("Argument missing: Please provide an argument.");
const arg: string = args[0];

require("dotenv").config();
const fs = require("fs");
const path = require("path");

const { Client } = require("@notionhq/client");
const notion = new Client({
  auth: process.env.NOTION_API_KEY_READONLY,
});

const HEADING_DIRECTORY = "src/output/heading/";
const CONTENT_DIRECTORY = "src/output/content/";
const REQUEST_DIRECTORY = "src/output/request/";
const TEMPLATE_DIRECTORY = "src/templates/";

interface OutputParams {
  pageId: string;
  directory: string;
  content: any;
}

const createOutput = ({
  pageId,
  directory,
  content,
}: OutputParams): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(directory)) fs.mkdirSync(directory, { recursive: true });
    fs.writeFile(
      `${directory}${pageId}.json`,
      JSON.stringify(content, null, 2), // Directly stringify the content
      (err: any) => {
        if (err) {
          reject("Error writing file");
        } else {
          console.log(
            `JSON object has been saved to ${directory}${pageId}.json`
          );
          resolve();
        }
      }
    );
  });
};

const outputHeading = async (pageId: string) => {
  const page = await notion.pages.retrieve({ page_id: pageId });

  // notion heading data shape >:(
  const heading = {
    icon: page.icon,
    properties: {
      Name: {
        title: [
          {
            text: {
              content: page.properties.Name.title[0].plain_text,
            },
          },
        ],
      },
    },
  };

  await createOutput({
    pageId,
    directory: HEADING_DIRECTORY,
    content: heading, // Directly pass heading object
  });
};

const outputChildren = async (pageId: string) => {
  const getBlock = async (blockId: string) =>
    await notion.blocks.children.list({
      block_id: blockId,
      page_size: 100, // 100 is the max allowed
    });

  const page = await getBlock(pageId).catch((_error) => {
    throw new Error("Notion API Error");
  });

  const children: any[] = [];

  page.results.forEach((block: any) => {
    const type = block.type;

    if (
      type === "rollup" ||
      type === "created_by" ||
      type === "last_edited_by" ||
      type === "last_edited_time"
    )
      return;

    children.push({ [type]: block[type] });
  });

  await createOutput({
    pageId,
    directory: CONTENT_DIRECTORY,
    content: children, // Directly pass the children array
  });
};

const outputRequest = async (pageId: string) => {
  try {
    const headingData = fs.readFileSync(
      `${HEADING_DIRECTORY}${pageId}.json`,
      "utf8"
    );
    const headingJson = JSON.parse(headingData);

    const contentData = fs.readFileSync(
      `${CONTENT_DIRECTORY}${pageId}.json`,
      "utf8"
    );
    const contentJson = JSON.parse(contentData);

    // Combine the contents
    const combinedJson = {
      ...headingJson,
      children: contentJson, // Explicitly add children array
    };

    await createOutput({
      pageId,
      directory: REQUEST_DIRECTORY,
      content: combinedJson,
    });
  } catch (err) {
    console.error("Error combining JSON files:", err);
    throw err;
  }
};

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
    const functionName = `notion${title.replace(/\s+/g, "")}`;

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
