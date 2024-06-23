import { Router, Request, Response } from "express";
import { asyncHandler, checkBodyParams } from "../utils/routers";
import { PDFExtract } from "pdf.js-extract";
import { useFile } from "../utils/downloads";
import { FileExtension } from "../utils/constants";

// well this was a waste of time. learned stuff though.

export const filesRouter: Router = Router();

// supported file types: pdf, doc, docx

const handlePdf = async (filePath: string) => {
  const pdfExtract = new PDFExtract();
  const data = await pdfExtract.extract(filePath);
  const textOutput = data.pages
    .map((page) => page.content.map((item) => item.str).join(" "))
    .join();
  return textOutput;
};

interface FileProps {
  fileUrl: string;
  fileMimeType: string;
}
filesRouter.get(
  "/essay",
  asyncHandler(async (req: Request, res: Response) => {
    const validatedParams = checkBodyParams<FileProps>(req, [
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
          text: await useFile(fileUrl, FileExtension.PDF, handlePdf),
        });
      default:
        return res.status(400).json({
          message: "Invalid file type",
        });
    }
  })
);
