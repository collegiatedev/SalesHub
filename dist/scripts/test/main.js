"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const files_1 = require("src/utils/files");
async function main() {
    const fileId = await (0, files_1.useFile)("https://storage.tally.so/private/Ahmed-Elbanna-Midyear-Transcript.pdf?id=O4NdL7&accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ik80TmRMNyIsImZvcm1JZCI6Inc0a0dBciIsImlhdCI6MTcxOTA4ODQ4OH0.wXWTUMAlVn1FRBItKfGBqnaIN0RIhVehT2awhwUPkuo&signature=ff22eae1b648adb6e63fdf36e35439cb5ec64b7bc242d70fc2fb2cbfb1d90c1d", "Ahmed-Elbanna-PS-Draft.pdf");
}
main();
