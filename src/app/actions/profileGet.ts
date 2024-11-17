"use server";

import { getSessionUserId } from "@/lib/auth";
import { prisma } from "@/lib/utils";

export type Profile = {
    id: string;
    name: string | null;
    gender: string | null;
    yearOfBirth: number | null;
    image: string | null;
    city: string | null;
};

export async function getProfile() : Promise<Profile | null> {
    const userId = await getSessionUserId();
    if (!userId) {
        return null;
    }

    return await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            name: true,
            gender: true,
            yearOfBirth: true,
            image: true,
            city: true,
        },
    });
}