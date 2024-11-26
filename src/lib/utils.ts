import { z } from "zod";
import DOMPurify from 'dompurify';
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

// Sanitize and log malicious inputs
export function sanitizeAndLog(input: string): string {
    if (!DOMPurify.sanitize) {
        return input;
    }
    const originalInput = input;
    
    // Sanitize the input using DOMPurify
    const sanitizedInput = DOMPurify.sanitize(input);

    // If input was modified, log it as malicious
    if (originalInput !== sanitizedInput) {
        const logData = {
            timestamp: new Date().toISOString(),
            maliciousInput: originalInput,
            sanitizedInput: sanitizedInput,
            action: 'sanitized', // Action taken
        };
        
        console.log('Malicious input detected and sanitized:', logData);
        // Optionally, send this log to an external logging service (e.g., Sentry, Loggly)
    }

    return sanitizedInput;
}