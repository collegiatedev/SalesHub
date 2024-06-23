import { Router, Request, Response } from "express";
import { asyncHandler, checkBodyParams } from "../utils/routers";
import { PDFExtract } from "pdf.js-extract";
import { useFile } from "../utils/downloads";
import { FileExtension } from "../utils/constants";

export const filesRouter: Router = Router();

// supported file types: pdf, doc, docx

const handlePdf = async (filePath: string) => {
  const pdfExtract = new PDFExtract();
  const data = await pdfExtract.extract(filePath);
  const textPages = data.pages.map((page) =>
    page.content.map((item) => item.str).join(" ")
  );
  return textPages;
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
          message: "essay reviewed",
          text: await useFile(fileUrl, FileExtension.PDF, handlePdf),
        });
      default:
        return res.status(400).json({
          message: "Invalid file type",
        });
    }
  })
);
// https://storage.tally.so/private/Ahmed-Elbanna-Midyear-Transcript.pdf?id=O4NdL7&accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ik80TmRMNyIsImZvcm1JZCI6Inc0a0dBciIsImlhdCI6MTcxOTA4ODQ4OH0.wXWTUMAlVn1FRBItKfGBqnaIN0RIhVehT2awhwUPkuo&signature=ff22eae1b648adb6e63fdf36e35439cb5ec64b7bc242d70fc2fb2cbfb1d90c1d
