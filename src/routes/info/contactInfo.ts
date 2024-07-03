import { Request, Response } from "express";
import { asyncHandler, infoRouter, checkBodyParams } from "../routers";
import { notionClient } from "../../clients";
import {
  createInfoPageProps,
  RequiredInfoFields,
} from "../../utils/studentInfo";

infoRouter.get(
  "/contact",
  asyncHandler(async (req: Request, res: Response) => {
    const validatedParams = checkBodyParams<ContactInfoInDatabaseProps>(req, [
      "studentName",
      "infoId",
      "time",
      "studentEmail",
      "studentPhone",
      "parentEmail",
      "parentPhone",
      "parentName",
    ]);

    if (!validatedParams.isValid)
      return res.status(400).json({
        message: validatedParams.error,
      });

    await contactInfoInDatabase(validatedParams.params);

    return res.json({
      message: "Contact Info - Generated",
    });
  })
);

interface ContactInfoInDatabaseProps extends RequiredInfoFields {
  studentEmail: string;
  studentPhone: string;
  parentEmail: string;
  parentPhone: string;
  parentName: string;
}
const contactInfoInDatabase = async ({
  studentName,
  infoId,
  time,
  studentEmail,
  studentPhone,
  parentEmail,
  parentPhone,
  parentName,
}: ContactInfoInDatabaseProps) => {
  const keyMap = new Map<string, Array<any>>();
  const page = await notionClient.pages.create(
    createInfoPageProps({
      studentName,
      infoId,
      time,
      infoName: "Contact Info",
      emoji: "📞",
    })
  );
  let res = await notionClient.blocks.children.append({
    block_id: page.id,
    children: [
      {
        heading_3: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "Student",
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
          is_toggleable: false,
          color: "default",
        },
      },
      {
        bulleted_list_item: {
          rich_text: [
            {
              type: "text",
              text: {
                content: `email: ${studentEmail}`,
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
          color: "default",
        },
      },
      {
        bulleted_list_item: {
          rich_text: [
            {
              type: "text",
              text: {
                content: `phone: ${studentPhone}`,
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
          color: "default",
        },
      },
      {
        heading_3: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "Parent",
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
          is_toggleable: false,
          color: "default",
        },
      },
      {
        bulleted_list_item: {
          rich_text: [
            {
              type: "text",
              text: {
                content: `name: ${parentName}`,
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
          color: "default",
        },
      },
      {
        bulleted_list_item: {
          rich_text: [
            {
              type: "text",
              text: {
                content: `email: ${parentEmail}`,
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
          color: "default",
        },
      },
      {
        bulleted_list_item: {
          rich_text: [
            {
              type: "text",
              text: {
                content: `phone: ${parentPhone}`,
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
          color: "default",
        },
      },
    ],
  });
  keyMap.set("1f9f9997ab4441e2a4be000dbc14e9da", res.results);
};
