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
    const studentId = input.responses.id.value;
    if (!studentId) throw new Error("student id not provided");

    const essay = (await redis.get(studentId)) as EssayTaskParams;
    if (!essay) throw new Error("Essay pre-reqs not completed");

    await essayTasks({
      ...essay,
      time: input.startTime,
    });
    await redis.del(studentId);

    return input;
  },
});
