'use client';

import { useEffect, useState } from 'react';
import TopicCard from './TopicCard';

export default function TopicsFeed() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    async function fetchTopics() {
      try {
        const response = await fetch('/api/votes');
        const data = await response.json();
        setTopics(data);
      } catch (error) {
        console.error('Error fetching topics:', error);
      }
    }

    fetchTopics();
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="space-y-6">
        {topics.map((topic) => (
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