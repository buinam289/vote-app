"use server";

import { getSessionUserId } from "@/lib/auth";
import formDataToObject from "@/lib/utils";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const profileSchema = z.object({
    name: z.string().min(1, "Name is required"),
    gender: z.string().min(1, "Gender is required"),
    city: z.string().min(1, "City is required"),
});

export async function updateProfile(formData: FormData) {
    const userId = await getSessionUserId();

    const profile = formDataToObject(formData, profileSchema);
    if (!userId || !profile) {
        return undefined;
    }

    const updatedUser =  await prisma.user.update({
        where: { id: userId },
        data: { 
            name: profile.name,
            gender: profile.gender,
            city: profile.city 
        },
    });

    return updatedUser;
}