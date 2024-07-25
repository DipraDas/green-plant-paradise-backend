"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const config_1 = __importDefault(require("../config"));
const handleZoderror_1 = __importDefault(require("../error/handleZoderror"));
const handleValidationError_1 = __importDefault(require("../error/handleValidationError"));
const handleCastError_1 = __importDefault(require("../error/handleCastError"));
const handleDuplicateError_1 = __importDefault(require("../error/handleDuplicateError"));
const AppError_1 = __importDefault(require("../error/AppError"));
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Something went wrong";
    let errorSources = [
        {
            path: "",
            message: "Something went wrong",
        },
    ];
    if (err instanceof zod_1.ZodError) {
        const simplifiedErros = (0, handleZoderror_1.default)(err);
        statusCode = simplifiedErros === null || simplifiedErros === void 0 ? void 0 : simplifiedErros.statusCode;
        message = simplifiedErros === null || simplifiedErros === void 0 ? void 0 : simplifiedErros.message;
        errorSources = simplifiedErros === null || simplifiedErros === void 0 ? void 0 : simplifiedErros.errorSources;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === "ValidationError") {
        const simplifiedErros = (0, handleValidationError_1.default)(err);
        statusCode = simplifiedErros === null || simplifiedErros === void 0 ? void 0 : simplifiedErros.statusCode;
        message = simplifiedErros === null || simplifiedErros === void 0 ? void 0 : simplifiedErros.message;
        errorSources = simplifiedErros === null || simplifiedErros === void 0 ? void 0 : simplifiedErros.errorSources;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === "CastError") {
        const simplifiedErros = (0, handleCastError_1.default)(err);
        statusCode = simplifiedErros === null || simplifiedErros === void 0 ? void 0 : simplifiedErros.statusCode;
        message = simplifiedErros === null || simplifiedErros === void 0 ? void 0 : simplifiedErros.message;
        errorSources = simplifiedErros === null || simplifiedErros === void 0 ? void 0 : simplifiedErros.errorSources;
    }
    else if ((err === null || err === void 0 ? void 0 : err.code) === 11000) {
        const simplifiedErros = (0, handleDuplicateError_1.default)(err);
        statusCode = simplifiedErros === null || simplifiedErros === void 0 ? void 0 : simplifiedErros.statusCode;
        message = simplifiedErros === null || simplifiedErros === void 0 ? void 0 : simplifiedErros.message;
        errorSources = simplifiedErros === null || simplifiedErros === void 0 ? void 0 : simplifiedErros.errorSources;
    }
    else if (err instanceof AppError_1.default) {
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
        message = err === null || err === void 0 ? void 0 : err.message;
        errorSources = [
            {
                path: "",
                message: err.message,
            },
        ];
    }
    else if (err instanceof Error) {
        message = err === null || err === void 0 ? void 0 : err.message;
        errorSources = [
            {
                path: "",
                message: err.message,
            },
        ];
    }
    res.status(statusCode).json({
        success: false,
        message: message,
        errorSources: errorSources,
        stack: config_1.default.node_env === "development" ? err : null,
    });
};
exports.default = globalErrorHandler;
