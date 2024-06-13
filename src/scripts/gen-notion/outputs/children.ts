import { CHILDREN_DIRECTORY, notion } from "../constants";
import { createOutput } from "./create";

// remove plain text, href fields from block object
const removeFields = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(removeFields);
  } else if (obj && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj)
        .filter(([key]) => key !== "plain_text" && key !== "href")
        .map(([key, value]) => [key, removeFields(value)])
    );
  }
  return obj;
};

export const outputChildren = async (pageId: string) => {
  const getBlock = async (blockId: string) =>
    await notion.blocks.children.list({
      block_id: blockId,
      page_size: 100, // 100 is the max allowed
    });

  const page = await getBlock(pageId).catch((_error) => {
    throw new Error("Notion API Error");
  });

  // await createOutput({
  //   pageId,
  //   directory: "src/output/test/",
  //   content: page,
  // });

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

    children.push({ [type]: removeFields(block[type]) });
  });

  await createOutput({
    pageId,
    directory: CHILDREN_DIRECTORY,
    content: children,
  });
};
