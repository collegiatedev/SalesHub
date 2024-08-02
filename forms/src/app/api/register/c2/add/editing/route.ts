import { HandlerTypes, outputHandler } from "~/app/api/_handlers/output";
import {
  EssayTaskParams,
  essayTasks,
} from "~/app/api/_utils/generator/essayTasks";
import { redis } from "~/app/api/constants";

// todo, documentation
// prereq: editing/d

export const POST = outputHandler<any>({
  type: HandlerTypes.Req,
  handler: async (input) => {
    const essay = JSON.parse(
      (await redis.get(input.id)) as string
    ) as EssayTaskParams;

    if (!essay) throw new Error("Essay pre-reqs not completed");

    await essayTasks({
      ...essay,
      time: input.startTime,
    });
    await redis.del(input.id);

    return input;
  },
});
