import { z } from "zod";

export const TodoSchema = z.object({
  title: z
    .string()
    .transform((val) => val.trim())
    .refine((val) => val.length > 0, {
      message: "Title is required",
    })
    .refine((val) => val.length <= 100, {
      message: "Title must be under 100 characters",
    }),
});
