// wrapper for temporarily downloading files, which gets deleted after function execution
// within the context of the function, use processDownloads to access the files
import axios from "axios";
import fs from "fs-extra";
import tmp from "tmp";
import path from "path";
import mime from "mime";
import { FileUpload } from "../types";

// Ensure temporary files are removed on exit
tmp.setGracefulCleanup();

interface DownloadFileParams {
  urls: string[];
  processDownloads: (files: Array<FileUpload>) => Promise<void>;
}

export const withFiles = async ({
  urls,
  processDownloads,
}: DownloadFileParams): Promise<void> => {
  const downloadedFiles: { filePath: string; fileName: string }[] = [];

  try {
    // Download files
    for (const url of urls) {
      const response = await axios.get(url, { responseType: "stream" });
      const fileName = path.basename(url);
      const tempFile = tmp.fileSync({ postfix: path.extname(fileName) });
      const writeStream = fs.createWriteStream(tempFile.name);
      response.data.pipe(writeStream);

      await new Promise((resolve, reject) => {
        writeStream.on("finish", resolve);
        writeStream.on("error", reject);
      });

      downloadedFiles.push({ filePath: tempFile.name, fileName });
    }

    // Convert to file streams and process files within the context
    const fileStreams = downloadedFiles.map((file) => ({
      fileName: file.fileName,
      fileStream: fs.createReadStream(file.filePath),
      mimeType: mime.getType(file.fileName) || "application/octet-stream",
    }));

    await processDownloads(fileStreams);
  } finally {
    // Clean up temporary files
    for (const file of downloadedFiles) {
      await fs.remove(file.filePath);
    }
  }
};
