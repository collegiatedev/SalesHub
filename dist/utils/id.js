"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateId = void 0;
const nanoid_1 = require("nanoid");
const alphabet = "0123456789abcdefghijklmnopqrstuvwxyz";
const nanoid = (0, nanoid_1.customAlphabet)(alphabet, 10);
const generateId = () => nanoid(); //=> "vcq0msqzdi"
exports.generateId = generateId;
