import TopicCard from './TopicCard';
import { getTopics } from '@/app/actions/topicsGet';

export default async function TopicsFeed() {

  const topics = await getTopics();

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="space-y-6">
        {topics.map((topic) => (
          <TopicCard key={topic.id} id={topic.id} question={topic.question} options={topic.options} totalVotes={topic.totalVotes} votedOptionId={topic.votedOptionId} />
        ))}
      </div>
    </div>
  );
}