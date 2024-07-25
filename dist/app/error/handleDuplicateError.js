"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleDuplicateError = (err) => {
    const regex = /"([^"]+?)"/;
    // Extract the value
    const matchRegex = err.errmsg.match(regex);
    const duplicateValue = matchRegex[1];
    const errorSources = [
        {
            path: "",
            message: `${duplicateValue} already exists`,
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: "Duplicate value entry",
        errorSources,
    };
};
exports.default = handleDuplicateError;
