import { CHILDREN_DIRECTORY, notion } from "../constants";
import { createOutput } from "./create";

const parseBlock = (block: any) => {
  // remove plain text, href fields from block object
  // todo: remove type from mention objects
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

  const newDirectory = `${CHILDREN_DIRECTORY}${pageId}/`;
  console.log("newDirectory", newDirectory);

  const children: any[] = [];

  for (let i = 0; i < page.results.length; i++) {
    const block = page.results[i];
    const parsedBlock = parseBlock(block);
    if (parsedBlock) children.push(parsedBlock);
    await recursiveChildren({
      blockId: block.id,
      directory: newDirectory,
      hasChildren: (block as any).has_children,
      position: i, // position is not used
    });
  }

  await createOutput({
    pageId,
    directory: newDirectory,
    content: children,
    subfolder: true,
  });
};
interface RecursiveChildrenParams {
  blockId: string;
  directory: string;
  position: number;
  hasChildren: boolean;
}
const recursiveChildren = async ({
  blockId,
  directory,
  position,
  hasChildren,
}: RecursiveChildrenParams) => {
  if (!hasChildren) return;

  const blocks = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 50,
  });

  const newDirectory = `${directory}${blockId}/`;
  const children: any[] = [];

  for (let i = 0; i < blocks.results.length; i++) {
    const block = blocks.results[i];
    const parsedBlock = parseBlock(block);
    if (parsedBlock) children.push(parsedBlock);
    await recursiveChildren({
      blockId: block.id,
      directory: newDirectory,
      position: i,
      hasChildren: (block as any).has_children,
    });
  }

  await createOutput({
    pageId: blockId,
    directory: newDirectory,
    content: { position, children },
    subfolder: hasChildren,
  });
};
