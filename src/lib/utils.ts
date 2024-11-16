import { z } from "zod";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export function formDataToObject<T>(formData: FormData, schema: z.ZodSchema<T>): T | undefined {
    // Convert FormData to plain object
    const obj = Object.fromEntries(formData.entries()) as Record<string, string>;

    // Validate and parse with Zod
    try {
        const parsedData = schema.parse(obj); // Zod will validate and return the parsed data
        return parsedData;
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error("Validation errors:", error.errors); // Handle validation errors
        }
        return undefined;
    }
}
