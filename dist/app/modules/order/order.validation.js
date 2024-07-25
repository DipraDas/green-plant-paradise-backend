"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidation = void 0;
const zod_1 = require("zod");
const productDataSchema = zod_1.z.object({
    id: zod_1.z.string(),
    quantity: zod_1.z.number().min(1, "Quantity must be at least 1"),
});
const createOrderValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, "Name is required"),
        phone: zod_1.z.string().min(1, "Phone number is required"),
        email: zod_1.z.string().email("Invalid email address"),
        address: zod_1.z.string().min(1, "Address is required"),
        product: zod_1.z
            .array(productDataSchema)
            .nonempty("At least one product is required"),
    }),
});
exports.OrderValidation = { createOrderValidationSchema };
