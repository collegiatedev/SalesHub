"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.outputChildren = void 0;
const clients_1 = require("src/clients");
const constants_1 = require("../constants");
const create_1 = require("./create");
const parseBlock = (block) => {
    // remove plain text, href fields from block object
    // todo: remove type from mention objects
    const removeFields = (obj) => {
        if (Array.isArray(obj)) {
            return obj.map(removeFields);
        }
        else if (obj && typeof obj === "object") {
            return Object.fromEntries(Object.entries(obj)
                .filter(([key]) => key !== "plain_text" && key !== "href")
                .map(([key, value]) => [key, removeFields(value)]));
        }
        return obj;
    };
    const type = block.type;
    // banned block types by notion api
    if (type === "rollup" ||
        type === "created_by" ||
        type === "last_edited_by" ||
        type === "last_edited_time")
        return;
    return { [type]: removeFields(block[type]) };
};
const outputChildren = async (pageId) => {
    const getBlock = async (blockId) => await clients_1.notionReadOnlyClient.blocks.children.list({
        block_id: blockId,
        page_size: 100, // 100 is the max allowed
    });
    const page = await getBlock(pageId).catch((_error) => {
        throw new Error("Notion API Error");
    });
    const newDirectory = `${constants_1.CHILDREN_DIRECTORY}${pageId}/`;
    await (0, create_1.deleteDirectoryIfExists)(newDirectory);
    const children = [];
    for (let i = 0; i < page.results.length; i++) {
        const block = page.results[i];
        const parsedBlock = parseBlock(block);
        if (parsedBlock)
            children.push(parsedBlock);
        await recursiveChildren({
            blockId: block.id,
            directory: newDirectory,
            hasChildren: block.has_children,
            position: i, // position is not used
        });
    }
    await (0, create_1.createOutput)({
        pageId,
        directory: newDirectory,
        content: children,
        subfolder: true,
    });
};
exports.outputChildren = outputChildren;
const recursiveChildren = async ({ blockId, directory, position, hasChildren, }) => {
    if (!hasChildren)
        return;
    const blocks = await clients_1.notionReadOnlyClient.blocks.children.list({
        block_id: blockId,
        page_size: 50,
    });
    const newDirectory = `${directory}${blockId}/`;
    const children = [];
    for (let i = 0; i < blocks.results.length; i++) {
        const block = blocks.results[i];
        const parsedBlock = parseBlock(block);
        if (parsedBlock)
            children.push(parsedBlock);
        await recursiveChildren({
            blockId: block.id,
            directory: newDirectory,
            position: i,
            hasChildren: block.has_children,
        });
    }
    await (0, create_1.createOutput)({
        pageId: blockId,
        directory: newDirectory,
        content: { position, children },
        subfolder: hasChildren,
    });
};
