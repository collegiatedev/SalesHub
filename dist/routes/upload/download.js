"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadPDF = void 0;
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const TEMP_FOLDER = "./downloads";
const downloadPDF = async (url, name) => {
    try {
        const outputPath = `${TEMP_FOLDER}/${name}.pdf`;
        const dir = path_1.default.dirname(outputPath);
        if (!fs_1.default.existsSync(dir)) {
            fs_1.default.mkdirSync(dir, { recursive: true }); // Create the directory if it does not exist
        }
        const response = await (0, axios_1.default)({
            method: "GET",
            url: url,
            responseType: "stream",
        });
        const writer = fs_1.default.createWriteStream(outputPath);
        response.data.pipe(writer);
        return new Promise((resolve, reject) => {
            writer.on("finish", resolve);
            writer.on("error", reject);
        });
    }
    catch (error) {
        console.error("Error downloading the file:", error);
    }
};
exports.downloadPDF = downloadPDF;
// Example usage
// const fileUrl: string =
//   "https://storage.tally.so/private/2024-Q2-3-Packages-Presentation.jpg?id=raZ5rM&accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InJhWjVyTSIsImZvcm1JZCI6Inc0a0dBciIsImlhdCI6MTcxOTAxMzE1MX0.-7SZ3apjELVKZf1C0ReklsQJhzTosgR4wmIyefEX9HU&signature=cb3f38cb3e30aa0f66472edd3e8c48b7db295e49684bee1ed3c5e48ad367a723";
// downloadFile(fileUrl, outputPath);
