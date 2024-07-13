import { z } from "zod";

const CategoryValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "Name must be of type string",
    }),
  }),
});

export const CategoryValidation = {
  CategoryValidationSchema,
};
