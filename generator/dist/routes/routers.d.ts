import { Request, RequestHandler, Router } from "express";
export declare const c1Router: Router;
export declare const c2Router: Router;
export declare const c3Router: Router;
export declare const infoRouter: Router;
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
