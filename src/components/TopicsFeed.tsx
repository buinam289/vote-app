import { auth } from '@/lib/auth';
import TopicCard from './TopicCard';
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export async function getTopics(userId: string) {

  const topics = await prisma.topic.findMany({
    include: {
      options: true,
    },
  });

  const votes = await prisma.vote.findMany({
    where: {
      userId: userId,
    },
  });

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

export default async function TopicsFeed() {
  const session = await auth();
  if (!session || !session?.user?.id) {
    return new Response('Unauthorized', { status: 401 });
  }
  const topics = await getTopics(session.user.id);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="space-y-6">
        {topics.map((topic) => (
          <div
            key={topic.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <TopicCard id={topic.id} question={topic.question} options={topic.options} totalVotes={topic.totalVotes} votedOptionId={topic.votedOptionId} />
          </div>
        ))}
      </div>
    </div>
  );
}