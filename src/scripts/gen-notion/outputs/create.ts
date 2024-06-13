import fs from "fs";

export const createOutput = ({
  pageId,
  directory,
  content,
}: {
  pageId: string;
  directory: string;
  content: any;
}): Promise<void> => {
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
