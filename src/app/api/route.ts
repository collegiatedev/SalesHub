import { NextRequest, NextResponse } from "next/server";
import { notion } from "../../utils/notion";
// import { notionConductC1Meeting } from "@/src/templates/notionConductC1Meeting";

export async function GET(_req: NextRequest) {
  // const page = notionConductC1Meeting({
  //   parentId: "1b4890ac69d042f2b58e55ca3415915a",
  // });

  await notion.pages.create({
    icon: {
      type: "emoji",
      emoji: "🥬",
    },
    parent: {
      type: "page_id",
      page_id: "01a6e6b795dc4594bb411ebff8e928b7",
    },
    properties: {
      title: [
        {
          text: {
            content: "Tuscan kale",
          },
        },
      ],
    },
  } as any);

  // const res = await notion.pages.create({ ...(page as any) });
  return NextResponse.json({
    // message: `Success! id: ${res.id}`,
    message: `Success!`,
  });
}
