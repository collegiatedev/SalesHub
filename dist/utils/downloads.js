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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFile = void 0;
const axios_1 = __importDefault(require("axios"));
const fs = __importStar(require("fs"));
const useFile = async (url, fileExtension, fileHandler) => {
    try {
        // Create a temporary directory
        const directory = "downloads/";
        if (!fs.existsSync(directory))
            fs.mkdirSync(directory, { recursive: true });
        const response = await (0, axios_1.default)({
            method: "GET",
            url: url,
            responseType: "stream",
        });
        const tempFilePath = `${directory}temp${fileExtension}`;
        const writer = fs.createWriteStream(tempFilePath);
        response.data.pipe(writer);
        await new Promise((resolve, reject) => {
            writer.on("finish", resolve);
            writer.on("error", reject);
        });
        const result = await fileHandler(tempFilePath);
        // Clean up: delete the temporary file
        fs.unlink(tempFilePath, (err) => {
            if (err)
                throw err;
        });
        return result;
    }
    catch (error) {
        console.error("Error in downloading or uploading the file", error);
        throw error;
    }
};
exports.useFile = useFile;
