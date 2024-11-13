import TopicCard from './TopicCard';
import { MOCK_TOPICS } from '@/data/mock-data';

export default function TopicsFeed() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="space-y-6">
        {MOCK_TOPICS.map((topic) => (
          <div
            key={topic.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <TopicCard {...topic} />
          </div>
        ))}
      </div>
    </div>
  );
}