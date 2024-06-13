import { CONTENT_DIRECTORY, notion } from "../constants";
import { createOutput } from "./create";

export const outputChildren = async (pageId: string) => {
  const getBlock = async (blockId: string) =>
    await notion.blocks.children.list({
      block_id: blockId,
      page_size: 100, // 100 is the max allowed
    });

  const page = await getBlock(pageId).catch((_error) => {
    throw new Error("Notion API Error");
  });

  await createOutput({
    pageId,
    directory: "src/output/test/",
    content: page,
  });

  const children: any[] = [];

  page.results.forEach((block: any) => {
    const type = block.type;

    // banned block types by notion api
    if (
      type === "rollup" ||
      type === "created_by" ||
      type === "last_edited_by" ||
      type === "last_edited_time"
    )
      return;

    children.push({ [type]: block[type] });
  });

  await createOutput({
    pageId,
    directory: CONTENT_DIRECTORY,
    content: children,
  });
};
