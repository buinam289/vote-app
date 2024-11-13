
import { auth } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export async function GET(): Promise<Response> {
    const session = await auth();
    if (!session || !session?.user?.id) {
        return new Response('Unauthorized', { status: 401 });
    }

    const topics = await prisma.topic.findMany({
        include: {
            options: true,
        },
    });

    const votes = await prisma.vote.findMany();

    const topicsWithVotedOption = topics.map(topic => {
        const votedOption = topic.options.find(option => 
                    votes.some(vote => vote.optionId === option.id)
                );
        return {
            ...topic,
            votedOption,
        };
    });

    return new Response(JSON.stringify(topicsWithVotedOption));
}

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

    return new Response(JSON.stringify(vote), { status: 201 });
}