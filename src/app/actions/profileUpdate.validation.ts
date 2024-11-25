
import { z } from "zod";

export const profileSchema = z.object({
    name: z.string().min(1, "Name is required"),
    gender: z.string().min(1, "Gender is required"),
    yearOfBirth: z.union([z.string(), z.number()]).transform((val) => typeof val === 'string' ? parseInt(val, 10) : val),
    city: z.string().min(1, "City is required"),
});