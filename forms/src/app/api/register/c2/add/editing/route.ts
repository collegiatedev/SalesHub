import { HandlerTypes, outputHandler } from "~/app/api/_handlers/output";
import {
  EssayTaskParams,
  essayTasks,
} from "~/app/api/_utils/generator/essayTasks";
import { redis } from "~/app/api/constants";
import { CalPayload } from "../../../cal/route";

// todo, documentation
// prereq: editing/d

// todo, type as cal payload
export const POST = outputHandler<CalPayload>({
  type: HandlerTypes.Req,
  handler: async (input) => {
    const essay = (await redis.get(input.studentId)) as EssayTaskParams;
    if (!essay) throw new Error("Essay pre-reqs not completed");

    await essayTasks({
      ...essay,
      time: input.startTime,
    });
    await redis.del(input.studentId);

    return input;
  },
});
