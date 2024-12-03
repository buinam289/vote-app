
import { getSessionUserId } from "@/lib/auth";
import { prisma } from "@/lib/utils";
import { profileSchema, UpdateProfileDto } from "./UpdateProfileDto";
import { modelBinding } from "@/lib/modelBinding";

export const GET = async (): Promise<Response> => {
    const userId = await getSessionUserId();
    if (!userId) {
        return new Response('Unauthorized', { status: 401 });
    }

    const profile = await prisma.user.findUnique({
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

    return new Response(JSON.stringify(profile), { status: 200 });
}


export const POST = modelBinding(profileSchema, [
    async () => await getSessionUserId() ?? '',
],
    async (updateProfileDto: UpdateProfileDto, userId: string): Promise<Response> => {

        const updatedProfile = await prisma.user.update({
            where: { id: userId },
            data: {
                name: updateProfileDto.name,
                gender: updateProfileDto.gender,
                yearOfBirth: Number(updateProfileDto.yearOfBirth),
                city: updateProfileDto.city
            },
        });

        return new Response(JSON.stringify(updatedProfile), { status: 200 });
    });