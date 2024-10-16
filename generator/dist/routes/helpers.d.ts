import { Request, RequestHandler } from "express";
export declare const asyncHandler: (fn: RequestHandler) => RequestHandler;
type ValidationResult<T extends Record<string, any>> = {
    isValid: true;
    params: T;
} | {
    isValid: false;
    error: string;
};
export declare function checkBodyParams<T extends Record<string, any>>(req: Request, requiredParams: (keyof T)[], optionalParams?: Array<keyof T>): ValidationResult<T>;
export {};
