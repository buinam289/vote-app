"use client"; // todo: make this server component

import { useState } from 'react';

interface Option {
  id: string;
  text: string;
  totalVotes: number;
}

export interface TopicCardProps {
  id: string;
  question: string;
  options: Option[];
  totalVotes: number;
  votedOptionId: string | null;
}

export default function TopicCard({ id, question, options, totalVotes, votedOptionId }: TopicCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(votedOptionId || null);
  const [hasVoted, setHasVoted] = useState(!!votedOptionId);

  const handleVote = async (id: string, optionId: string) => {
    if (!hasVoted) {
      const response = await fetch('/api/votes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topicId: id, optionId }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit vote');
      }

      setSelectedOption(optionId);
      setHasVoted(true);
    }
  };

  const getPercentage = (optionVotes: number) => {
    return totalVotes === 0 ? 0 : Math.round((optionVotes / totalVotes) * 100);
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 mb-8 transition-transform transform hover:scale-105">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{question}</h2>
        <div className="space-y-4">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleVote(id, option.id)}
              className={`w-full text-left p-4 rounded-md relative overflow-hidden transition-all ${hasVoted ? 'cursor-default' : 'hover:bg-blue-50 cursor-pointer'
                } ${selectedOption === option.id ? 'border-2 border-blue-500' : 'border border-gray-300'
                }`}
            >
              {hasVoted && (
                <div
                  className="absolute left-0 top-0 h-full bg-blue-500 bg-opacity-30 transition-all"
                  style={{ width: `${getPercentage(option.totalVotes)}%` }}
                />
              )}
              <div className="relative flex justify-between items-center">
                <span className="text-gray-700">{option.text}</span>
                {hasVoted && (
                  <span className="text-sm font-medium text-gray-600">
                    {getPercentage(option.totalVotes)}%
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}