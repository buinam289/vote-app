"use server";

import { getSessionUserId } from "@/lib/auth";
import { prisma } from "@/lib/utils";
import { profileSchema } from "./profileUpdate.validation";
import { AppResponse, validate } from "@/lib/middlewares/validation";
import { User } from "@prisma/client";

interface UpdateProfileProjection {
    id: string;
    name: string | null;
    gender: string | null;
    yearOfBirth: number | null;
    city: string | null;
};

async function handler(updateProfileDto: UpdateProfileProjection): Promise<AppResponse<User>> {
    const userId = await getSessionUserId();

    const updatedProfile = await prisma.user.update({
        where: { id: userId },
        data: {
            name: updateProfileDto.name,
            gender: updateProfileDto.gender,
            yearOfBirth: Number(updateProfileDto.yearOfBirth),
            city: updateProfileDto.city
        },
    });

    return { success: true, data: updatedProfile };
}

const updateProfile = validate<UpdateProfileProjection, User>(profileSchema, handler);
export default updateProfile;