import TopicsFeed from '@/components/TopicsFeed';
import Header from '@/components/Header';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
// import "@/data/mock-data";

export default async function Home() {
  const session = await auth();
  if (!session) {
    redirect("auth/signin");
  }
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50/50">
      <Header />
      <TopicsFeed />
    </main>
  );
}