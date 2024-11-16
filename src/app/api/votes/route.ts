
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

    // TODO: use event to update the total votes
    // calculate total votes for the option
    const totalVotes = await prisma.vote.count({
        where: { optionId },
    });

    // update the option with the total votes
    await prisma.option.update({
        where: { id: optionId },
        data: { totalVotes },
    });

    // calculate total votes for the option's topic
    const totalTopicVotes = await prisma.vote.count({
        where: { topicId },
    });

    // update the topic with the total votes
    await prisma.topic.update({
        where: { id: topicId },
        data: { totalVotes: totalTopicVotes },
    });

    return new Response(JSON.stringify(vote.id), { status: 201 });
}