import TopicsFeed from '@/components/TopicsFeed';
import Header from '@/components/Header';
// import "@/data/mock-data";

export default async function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50/50">
      <Header />
      <TopicsFeed />
    </main>
  );
}