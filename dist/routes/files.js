"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filesRouter = void 0;
const express_1 = require("express");
const routers_1 = require("../utils/routers");
const pdf_js_extract_1 = require("pdf.js-extract");
const downloads_1 = require("../utils/downloads");
const constants_1 = require("../utils/constants");
exports.filesRouter = (0, express_1.Router)();
// supported file types: pdf, doc, docx
const handlePdf = async (filePath) => {
    const pdfExtract = new pdf_js_extract_1.PDFExtract();
    const data = await pdfExtract.extract(filePath);
    const textOutput = data.pages
        .map((page) => page.content.map((item) => item.str).join(" "))
        .join();
    return textOutput;
};
exports.filesRouter.get("/essay", (0, routers_1.asyncHandler)(async (req, res) => {
    const validatedParams = (0, routers_1.checkBodyParams)(req, [
        "fileUrl",
        "fileMimeType",
    ]);
    if (!validatedParams.isValid)
        return res.status(400).json({
            message: validatedParams.error,
        });
    const { fileUrl, fileMimeType } = validatedParams.params;
    switch (fileMimeType) {
        case "application/pdf":
            return res.json({
                message: "essay reviewed",
                text: await (0, downloads_1.useFile)(fileUrl, constants_1.FileExtension.PDF, handlePdf),
            });
        default:
            return res.status(400).json({
                message: "Invalid file type",
            });
    }
}));
// https://storage.tally.so/private/Ahmed-Elbanna-Midyear-Transcript.pdf?id=O4NdL7&accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ik80TmRMNyIsImZvcm1JZCI6Inc0a0dBciIsImlhdCI6MTcxOTA4ODQ4OH0.wXWTUMAlVn1FRBItKfGBqnaIN0RIhVehT2awhwUPkuo&signature=ff22eae1b648adb6e63fdf36e35439cb5ec64b7bc242d70fc2fb2cbfb1d90c1d
