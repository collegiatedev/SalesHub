"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieveField = void 0;
const retrieveField = (data, title) => {
    return data.payload.fields.reduce((acc, field) => {
        if (field.title === title)
            return field.answer.value;
        return acc;
    }, "");
};
exports.retrieveField = retrieveField;
