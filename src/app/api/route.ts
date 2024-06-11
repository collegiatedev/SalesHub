import { NextRequest, NextResponse } from "next/server";
import { notion } from "../../utils/notion";
import { notionConductC1Meeting } from "@/src/templates/notionConductC1Meeting";
import { notion7FreeThingsforStudentsYouMightNotKnowAbout } from "@/src/templates/notion7FreeThingsforStudentsYouMightNotKnowAbout";

export async function GET(_req: NextRequest) {
  const page = notion7FreeThingsforStudentsYouMightNotKnowAbout(
    "1b4890ac69d042f2b58e55ca3415915a"
  );

  const res = await notion.pages.create({ ...(page as any) });
  return NextResponse.json({
    message: `Success! id: ${res.id}`,
  });
}
