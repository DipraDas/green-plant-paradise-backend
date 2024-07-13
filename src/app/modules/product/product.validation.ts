import { z } from "zod";
import { Types } from "mongoose";

const createProductValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    image: z.string().url(),
    price: z.number().positive(),
    quantity: z.number().min(1),
    description: z.string(),
    briefDescription: z.string(),
    rating: z.number().min(1).max(5),
    categories: z.array(
      z.string().refine((val) => Types.ObjectId.isValid(val), {
        message: "Invalid category ObjectId",
      })
    ),
    featured: z.boolean(),
  }),
});

const updateProductValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    image: z.string().url().optional(),
    price: z.number().positive().optional(),
    quantity: z.number().min(1).optional(),
    description: z.string().optional(),
    briefDescription: z.string().optional(),
    rating: z.number().min(1).max(5),
    categories: z
      .array(
        z.string().refine((val) => Types.ObjectId.isValid(val), {
          message: "Invalid category ObjectId",
        })
      )
      .optional(),
  }),
  featured: z.boolean().optional(),
});
export const ProductValidation = {
  createProductValidationSchema,
  updateProductValidationSchema,
};
