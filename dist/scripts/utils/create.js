"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDirectoryIfExists = exports.createOutput = exports.createFolder = void 0;
const fs_1 = __importDefault(require("fs"));
// need to clean this bs up
const createFolder = ({ directory, pageId, subfolder, }) => {
    if (!fs_1.default.existsSync(directory))
        fs_1.default.mkdirSync(directory, { recursive: true });
    const useDirectory = subfolder ? directory + pageId + "/" : directory;
    if (subfolder && !fs_1.default.existsSync(useDirectory))
        fs_1.default.mkdirSync(useDirectory, { recursive: true });
    return useDirectory;
};
exports.createFolder = createFolder;
const createOutput = ({ pageId, directory, content, subfolder, }) => {
    return new Promise((resolve, reject) => {
        const useDirectory = (0, exports.createFolder)({ pageId, directory, subfolder });
        fs_1.default.writeFile(`${useDirectory}${pageId}.json`, JSON.stringify(content, null, 2), // Directly stringify the content
        (err) => {
            if (err) {
                reject("Error writing file");
            }
            else {
                console.log(`JSON object has been saved to ${useDirectory}${pageId}.json`);
                resolve();
            }
        });
    });
};
exports.createOutput = createOutput;
// deletes previous output files to make sure no legacy files are kept
const deleteDirectoryIfExists = async (directory) => {
    return new Promise((resolve, reject) => {
        if (fs_1.default.existsSync(directory)) {
            fs_1.default.rmdir(directory, { recursive: true }, (err) => {
                if (err) {
                    return reject(`Error deleting directory: ${err.message}`);
                }
                resolve();
            });
        }
        else {
            resolve();
        }
    });
};
exports.deleteDirectoryIfExists = deleteDirectoryIfExists;
