import { z } from "zod";
import { Types } from "mongoose";

const productDataSchema = z.object({
  id: z.string(),
  quantity: z.number().min(1, "Quantity must be at least 1"),
});

const createOrderValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    phone: z.string().min(1, "Phone number is required"),
    email: z.string().email("Invalid email address"),
    address: z.string().min(1, "Address is required"),
    product: z
      .array(productDataSchema)
      .nonempty("At least one product is required"),
  }),
});
export const OrderValidation = { createOrderValidationSchema };
