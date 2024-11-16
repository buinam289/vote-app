
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/utils";

export async function POST(request: Request): Promise<Response> {
    const session = await auth();
    if (!session || !session?.user?.id) {
        return new Response('Unauthorized', { status: 401 });
    }

    const { topicId, optionId } = await request.json();
    const vote = await prisma.vote.create({
        data: {
            topicId,
            optionId,
            userId: session.user.id,
        },
    });

    return new Response(JSON.stringify(vote.id), { status: 201 });
}