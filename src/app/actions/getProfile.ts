"use server";

import { getSessionUserId } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type Profile = {
    id: string;
    name: string | null;
    gender: string | null;
    image: string | null;
    city: string | null;
};

export async function getProfile() : Promise<Profile | null> {
    "use server";
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
            image: true,
            city: true,
        },
    });
}