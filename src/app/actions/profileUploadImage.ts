"use server";

import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { getSessionUserId } from "@/lib/auth";

const prisma = new PrismaClient();

// Define the Server Action function to upload the file
export async function uploadProfileImage(formData: FormData) {
    // Get the uploaded file from FormData
    const file = formData.get("file") as File;

    // Ensure a file is present
    if (!file) {
        throw new Error("No file uploaded.");
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    // Save the file to the 'uploads' directory
    const uploadPath = path.join(process.cwd(), "public", "uploads", file.name);
    await fs.writeFile(uploadPath, buffer);

    // Update the user's profile image path in the database
    const userId = await getSessionUserId();
    if (!userId) {
        return null;
    }
    const imagePath = `/uploads/${file.name}`;
    await prisma.user.update({
        where: { id: userId },
        data: { image: imagePath },
    });

    // Optionally revalidate or trigger a cache update if needed
    revalidatePath("/");

    return imagePath;
}
