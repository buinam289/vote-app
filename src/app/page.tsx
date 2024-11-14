import TopicsFeed from '@/components/TopicsFeed';
import Header from '@/components/Header';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
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

export default async function Home() {
  const session = await auth();
  if (!session || !session?.user?.id) {
    redirect("auth/signin");
  }

  const topics = await getTopics(session.user.id);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50/50">
      <Header />
      <TopicsFeed topics={topics} />
    </main>
  );
}