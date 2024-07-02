import { NextRequest, NextResponse } from "next/server";

// 1. try-catch error handling
// 2. check query params

export type ApiResponse<T> = {
  message: string;
  data: T | null;
};

type HandlerFunction<T> = (utilContext: Record<string, string>) => Promise<T>;
export const reqHandler = <T>(
  requiredParams: string[],
  handler: HandlerFunction<T>
) => {
  return async (req: NextRequest): Promise<NextResponse<ApiResponse<T>>> => {
    try {
      const { searchParams } = new URL(req.url);
      const missingParams: string[] = [];

      const utilContext: Record<string, string> = {};
      requiredParams.forEach((param) => {
        const value = searchParams.get(param);
        if (value === null) {
          missingParams.push(param);
        } else {
          utilContext[param] = value;
        }
      });

      if (missingParams.length > 0) {
        return NextResponse.json(
          {
            message: `Missing required query parameters: ${missingParams.join(
              ", "
            )}`,
            data: null,
          },
          { status: 400 }
        );
      }

      const data = await handler(utilContext);

      return NextResponse.json({
        message: "Success",
        data,
      });
    } catch (error) {
      console.error(error);

      const errorResponse = {
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
        data: null,
      };

      return NextResponse.json(errorResponse, { status: 500 });
    }
  };
};
