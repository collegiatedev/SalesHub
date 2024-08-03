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
    console.log("editing/d", input);

    const studentId = input.responses.id.value;
    if (!studentId) throw new Error("student id not provided");

    const data = (await redis.get(studentId)) as string;
    console.log("data", data);

    const essay = JSON.parse(data) as EssayTaskParams;
    console.log("essay", essay);

    if (!essay) throw new Error("Essay pre-reqs not completed");

    await essayTasks({
      ...essay,
      time: input.startTime,
    });
    await redis.del(studentId);

    return input;
  },
});
