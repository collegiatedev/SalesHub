import { customAlphabet } from "nanoid";

const alphabet = "0123456789abcdefghijklmnopqrstuvwxyz";
const nanoid = customAlphabet(alphabet, 10);
export const generateId = () => nanoid(); //=> "vcq0msqzdi"
