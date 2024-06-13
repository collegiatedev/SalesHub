// import { generateConductC1MeetingDatabase } from "@/src/templates/generateConductC1MeetingDatabase";
import { generateConductC1MeetingPage } from "@/src/templates/generateConductC1MeetingPage";
import { notion } from "@/src/utils/notion";
import { NextRequest, NextResponse } from "next/server";
// import { notionConductC1Meeting } from "@/src/templates/notionConductC1Meeting";

export async function GET(_req: NextRequest) {
  const test_db = "1b4890ac69d042f2b58e55ca3415915a";
  const test_page = "01a6e6b795dc4594bb411ebff8e928b7";

  // await generateConductC1MeetingPage({ parentId: test_page });

  // const page = notionConductC1Meeting({
  //   parentId: "1b4890ac69d042f2b58e55ca3415915a",
  // });
  const blockId = "8a8265f7-225a-471c-9763-745214a171ef";
  const response = await notion.blocks.children.append({
    block_id: blockId,
    children: [
      {
        heading_2: {
          rich_text: [
            {
              text: {
                content: "Lacinato kale",
              },
            },
          ],
          is_toggleable: true,
        },
      },
    ],
  });

  console.log(response);

  // const res = await notion.pages.create({ ...(page as any) });
  return NextResponse.json({
    message: `Success!: ${response}`,
  });
}
