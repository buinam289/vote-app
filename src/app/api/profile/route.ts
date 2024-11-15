import { auth } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(): Promise<Response> {
    const session = await auth();
    if (!session || !session?.user?.id) {
        return new Response('Unauthorized', { status: 401 });
    }

    const userProfile = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: {
            id: true,
            name: true,
            gender: true,
            image: true,
            city: true,
        },
    });

    if (!userProfile) {
        return new Response('User not found', { status: 404 });
    }

    return new Response(JSON.stringify(userProfile), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}

export default async function PUT(request: Request): Promise<Response> {
    const session = await auth();
    if (!session || !session?.user?.id) {
        return new Response('Unauthorized', { status: 401 });
    }

    const { id, name, gender, city } = await request.json();

    if (!id || !name || !gender || !city) {
        return new Response('Invalid input', { status: 400 });
    }

    const updatedUser = await prisma.user.update({
        where: { id: session.user.id },
        data: { name, gender, city },
    });

    const updatedProfile = {
        id: updatedUser.id,
        name: updatedUser.name,
        image: updatedUser.image,
        gender: updatedUser.gender,
        city: updatedUser.city,
    };

    return new Response(JSON.stringify(updatedProfile), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}