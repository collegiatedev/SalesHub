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
    return undefined;
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

  const newDirectory = `${CHILDREN_DIRECTORY}${pageId}/`;

  const children: any[] = [];
  for (const block of page.results) {
    const parsedBlock = parseBlock(block);
    if (parsedBlock) children.push(parsedBlock);
    await recursiveChildren(
      block.id,
      newDirectory,
      (block as any).has_children
    );
  }

  await createOutput({
    pageId,
    directory: newDirectory,
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

  for (const block of blocks.results) {
    const parsedBlock = parseBlock(block);
    if (parsedBlock) children.push(parsedBlock);
    // typecasting is wrong
    await recursiveChildren(
      block.id,
      newDirectory,
      (block as any).has_children
    );
  }

  await createOutput({
    pageId: blockId,
    directory: newDirectory,
    content: children,
    subfolder: hasChildren,
  });
};
