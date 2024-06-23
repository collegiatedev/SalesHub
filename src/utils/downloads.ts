import axios from "axios";
import * as fs from "fs";
import { FileExtension } from "./constants";

type FileHandler<R = any> = (filePath: string) => Promise<R>;

export const useFile = async <R>(
  url: string,
  fileExtension: FileExtension,
  fileHandler: FileHandler<R>
): Promise<R> => {
  try {
    // Create a temporary directory
    const directory = "downloads/";
    if (!fs.existsSync(directory)) fs.mkdirSync(directory, { recursive: true });

    const response = await axios({
      method: "GET",
      url: url,
      responseType: "stream",
    });

    const tempFilePath = `${directory}temp${fileExtension}`;

    const writer: fs.WriteStream = fs.createWriteStream(tempFilePath);
    response.data.pipe(writer);

    await new Promise<void>((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });

    const result = await fileHandler(tempFilePath);

    // Clean up: delete the temporary file
    fs.unlink(tempFilePath, (err) => {
      if (err) throw err;
    });

    return result;
  } catch (error: any) {
    console.error("Error in downloading or uploading the file", error);
    throw error;
  }
};
