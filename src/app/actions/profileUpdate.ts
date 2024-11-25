"use server";

import { getSessionUserId } from "@/lib/auth";
import {prisma, formDataToObject} from "@/lib/utils";
import {profileSchema} from "./profileUpdate.validation";
import { validate } from "@/lib/middlewares/validation";

type Response = {
    success: boolean;
    data: UpdateProfileProjection;
}

type UpdateProfileProjection = {
    id: string;
    name: string | null;
    gender: string | null;
    yearOfBirth: number | null;
    city: string | null;
};

async function handler(formData: FormData): Promise<Response | undefined> {
    const userId = await getSessionUserId();

    const profile = formDataToObject(formData, profileSchema);
    if (!userId || !profile) {
        return undefined;
    }

    const updatedProfile = await prisma.user.update({
        where: { id: userId },
        data: { 
            name: profile.name,
            gender: profile.gender,
            yearOfBirth: Number(profile.yearOfBirth),
            city: profile.city 
        },
    });

    return {success: true, data: updatedProfile};
}

const updateProfile = validate(profileSchema, handler);
export default updateProfile;