import TopicFeed from '@/components/TopicFeed';
import Header from '@/components/Header';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50/50">
      <Header />
      <TopicFeed />
    </main>
  );
}