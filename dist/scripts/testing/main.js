"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const fs = __importStar(require("fs"));
const downloads_1 = require("../../utils/downloads");
const clients_1 = require("src/utils/clients");
const someFileHandler = async (filePath) => {
    const fileStream = fs.createReadStream(filePath);
    const response = await clients_1.openaiClient.files.create({
        file: fileStream,
        purpose: "assistants",
    });
    return response;
};
async function main() {
    console.log("hello");
    const fileId = await (0, downloads_1.useFile)("https://storage.tally.so/private/Ahmed-Elbanna-Midyear-Transcript.pdf?id=O4NdL7&accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ik80TmRMNyIsImZvcm1JZCI6Inc0a0dBciIsImlhdCI6MTcxOTA4ODQ4OH0.wXWTUMAlVn1FRBItKfGBqnaIN0RIhVehT2awhwUPkuo&signature=ff22eae1b648adb6e63fdf36e35439cb5ec64b7bc242d70fc2fb2cbfb1d90c1d", "Ahmed-Elbanna-PS-Draft.pdf", someFileHandler);
    return fileId;
}
main();
