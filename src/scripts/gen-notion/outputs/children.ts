import { CHILDREN_DIRECTORY, notion } from "../constants";
import { createOutput } from "./create";

const parseBlock = (block: any) => {
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

  const type = block.type;
  // banned block types by notion api
  if (
    type === "rollup" ||
    type === "created_by" ||
    type === "last_edited_by" ||
    type === "last_edited_time"
  )
    return;
  return { [type]: removeFields(block[type]) };
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

  const children: any[] = [];
  page.results.forEach(async (block: any) => {
    const parsedBlock = parseBlock(block);
    if (parsedBlock) children.push(parsedBlock);

    await recursiveChildren(
      block.id,
      `${CHILDREN_DIRECTORY}${pageId}/`,
      block.has_children
    );
  });
  await createOutput({
    pageId,
    directory: CHILDREN_DIRECTORY,
    content: children,
    subfolder: true,
  });
};

const recursiveChildren = async (
  blockId: string,
  directory: string,
  hasChildren: boolean
) => {
  if (!hasChildren) return;

  const blocks = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 50,
  });
  const newDirectory = `${directory}${blockId}/`;

  const children: any[] = [];
  blocks.results.forEach(async (block: any) => {
    const parsedBlock = parseBlock(block);
    if (parsedBlock) children.push(parsedBlock);
    await recursiveChildren(block.id, newDirectory, block.has_children);
  });

  await createOutput({
    pageId: blockId,
    directory: newDirectory,
    content: children,
    subfolder: hasChildren,
  });
};
