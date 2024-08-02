import { HandlerTypes, outputHandler } from "~/app/api/_handlers/output";
import {
  EssayTaskParams,
  essayTasks,
} from "~/app/api/_utils/generator/essayTasks";
import { redis } from "~/app/api/constants";

export const POST = outputHandler<any>({
  type: HandlerTypes.Req,
  handler: async (input) => {
    const essay = await redis.get(input.id);
    if (!essay) throw new Error("Essay pre-reqs not completed");

    await essayTasks(essay as EssayTaskParams);
    await redis.del(input.id);

    return input;
  },
});
