import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma // hot reload for Dev: https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections

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
