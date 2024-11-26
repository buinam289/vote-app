
import { sanitizeAndLog } from "@/lib/utils";
import { z } from "zod";

export const profileSchema = z.object({
    name: z.string().min(1, "Name is required")
    .transform((input) => sanitizeAndLog(input))
    .refine((sanitized) => /^[a-zA-Z\s'-]+$/.test(sanitized), {
      message: "Sanitized name contains invalid characters.",
    }),
    gender: z.string().min(1, "Gender is required"),
    yearOfBirth: z.union([z.string(), z.number()]).transform((val) => typeof val === 'string' ? parseInt(val, 10) : val),
    city: z.string().min(1, "City is required"),
});