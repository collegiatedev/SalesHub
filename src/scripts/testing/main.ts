import "dotenv/config";
import * as fs from "fs";
import { useFile } from "../../utils/downloads";
import { openaiClient } from "src/utils/clients";

const someFileHandler = async (filePath: string) => {
  const fileStream = fs.createReadStream(filePath);
  const response = await openaiClient.files.create({
    file: fileStream,
    purpose: "assistants",
  });
  return response;
};

async function main() {
  console.log("hello");
  const fileId = await useFile(
    "https://storage.tally.so/private/Ahmed-Elbanna-Midyear-Transcript.pdf?id=O4NdL7&accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ik80TmRMNyIsImZvcm1JZCI6Inc0a0dBciIsImlhdCI6MTcxOTA4ODQ4OH0.wXWTUMAlVn1FRBItKfGBqnaIN0RIhVehT2awhwUPkuo&signature=ff22eae1b648adb6e63fdf36e35439cb5ec64b7bc242d70fc2fb2cbfb1d90c1d",
    "Ahmed-Elbanna-PS-Draft.pdf",
    someFileHandler
  );
  return fileId;
}

main();
