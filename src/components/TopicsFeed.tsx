import TopicCard from './TopicCard';
import { TopicCardProps } from './TopicCard';

type TopicsFeedProps = {
  topics: Array<TopicCardProps>;
};

export default function TopicsFeed({ topics }: TopicsFeedProps) {

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