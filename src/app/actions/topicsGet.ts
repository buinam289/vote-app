"use server";

import { getSessionUserId } from "@/lib/auth";
import { prisma } from "@/lib/utils";

type OptionProjection = {
    id: string;
    text: string;
    totalVotes: number;
}

export type TopicCardProjection = {
    id: string;
    question: string;
    options: OptionProjection[];
    totalVotes: number;
    votedOptionId: string | null;
}

export async function getTopics(): Promise<TopicCardProjection[]> {
    const userId = await getSessionUserId();

    const topics = await prisma.topic.findMany({
        include: {
            options: true,
        },
        orderBy: {
            id: 'asc'
        }
    });

    topics.map(topic => {
        topic.options = topic.options.sort((a, b) => a.id.localeCompare(b.id));
    });

    const votes = userId ? await prisma.vote.findMany({
        where: {
            userId: userId,
        },
    }) : [];

    return topics.map(topic => {
        const votedOption = topic.options.find(option =>
            votes.some(vote => vote.optionId === option.id)
        );
        return {
            ...topic,
            votedOptionId: votedOption?.id ?? null
        };
    });
}
