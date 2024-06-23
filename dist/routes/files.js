"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filesRouter = void 0;
const express_1 = require("express");
const routers_1 = require("../utils/routers");
const pdf_js_extract_1 = require("pdf.js-extract");
const downloads_1 = require("../utils/downloads");
const constants_1 = require("../utils/constants");
// well this was a waste of time. learned stuff though.
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
                text: await (0, downloads_1.useFile)(fileUrl, constants_1.FileExtension.PDF, handlePdf),
            });
        default:
            return res.status(400).json({
                message: "Invalid file type",
            });
    }
}));
