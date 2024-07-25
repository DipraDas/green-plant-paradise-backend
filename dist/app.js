"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unused-vars */
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
const notFound_1 = __importDefault(require("./app/middleware/notFound"));
const routes_1 = __importDefault(require("./app/routes"));
const app = (0, express_1.default)();
// parser
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// application route
app.use("/api/v1", routes_1.default);
// const test = (req: Request, res: Response) => {
//   Promise.reject();
//   res.send("hello world");
// };
app.get("/", (req, res) => {
    res.send("Green Planet Paradise Project Running");
});
// app.use("/", test);
// error handler middleware
app.use(globalErrorHandler_1.default);
// not found
app.use(notFound_1.default);
exports.default = app;
