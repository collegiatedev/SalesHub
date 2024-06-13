import path from "path";
import fs from "fs";
import { TEMPLATE_DIRECTORY } from "../constants";

export const getOutputTitle = (outputJson: any, path: string) => {
  const getNestedProperty = (obj: any, path: string): any =>
    path.split(".").reduce((acc, part) => acc && acc[part], obj);

  const title = getNestedProperty(outputJson, path);
  if (!title) throw new Error("Title not found in output.json");
  return title as string;
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
