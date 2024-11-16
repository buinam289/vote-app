"use server";

import { getSessionUserId } from "@/lib/auth";
import {prisma, formDataToObject} from "@/lib/utils";
import { z } from "zod";

const profileSchema = z.object({
    name: z.string().min(1, "Name is required"),
    gender: z.string().min(1, "Gender is required"),
    city: z.string().min(1, "City is required"),
});

type UpdateProfileProjection = {
    id: string;
    name: string | null;
    gender: string | null;
    city: string | null;
};

export async function updateProfile(formData: FormData): Promise<UpdateProfileProjection | null> {
    const userId = await getSessionUserId();

    const profile = formDataToObject(formData, profileSchema);
    if (!userId || !profile) {
        return null;
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