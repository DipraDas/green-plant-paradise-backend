"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidation = void 0;
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
const createProductValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string(),
        image: zod_1.z.string().url(),
        price: zod_1.z.number().positive(),
        quantity: zod_1.z.number().min(1),
        description: zod_1.z.string(),
        briefDescription: zod_1.z.string(),
        rating: zod_1.z.number().min(1).max(5),
        categories: zod_1.z.array(zod_1.z.string().refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
            message: "Invalid category ObjectId",
        })),
        featured: zod_1.z.boolean(),
    }),
});
const updateProductValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        image: zod_1.z.string().url().optional(),
        price: zod_1.z.number().positive().optional(),
        quantity: zod_1.z.number().min(1).optional(),
        description: zod_1.z.string().optional(),
        briefDescription: zod_1.z.string().optional(),
        rating: zod_1.z.number().min(1).max(5).optional(),
        categories: zod_1.z
            .array(zod_1.z.string().refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
            message: "Invalid category ObjectId",
        }))
            .optional(),
    }),
    featured: zod_1.z.boolean().optional(),
});
exports.ProductValidation = {
    createProductValidationSchema,
    updateProductValidationSchema,
};
