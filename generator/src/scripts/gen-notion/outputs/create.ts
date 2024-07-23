import fs from "fs";

export const createOutput = ({
  pageId,
  directory,
  content,
  subfolder,
}: {
  pageId: string;
  directory: string;
  content: any;
  subfolder: boolean;
}): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(directory)) fs.mkdirSync(directory, { recursive: true });

    const useDirectory = subfolder ? directory + pageId + "/" : directory;
    if (subfolder && !fs.existsSync(useDirectory))
      fs.mkdirSync(useDirectory, { recursive: true });

    fs.writeFile(
      `${useDirectory}${pageId}.json`,
      JSON.stringify(content, null, 2), // Directly stringify the content
      (err: any) => {
        if (err) {
          reject("Error writing file");
        } else {
          console.log(
            `JSON object has been saved to ${useDirectory}${pageId}.json`
          );
          resolve();
        }
      }
    );
  });
};

// deletes previous output files to make sure no legacy files are kept
export const deleteDirectoryIfExists = async (
  directory: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(directory)) {
      fs.rmdir(directory, { recursive: true }, (err) => {
        if (err) {
          return reject(`Error deleting directory: ${err.message}`);
        }
        resolve();
      });
    } else {
      resolve();
    }
  });
};
