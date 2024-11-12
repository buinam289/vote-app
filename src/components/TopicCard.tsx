"use client";

import { useState } from 'react';

interface Option {
  id: string;
  text: string;
  votes: number;
}

interface TopicCardProps {
  id: string;
  question: string;
  options: Option[];
  totalVotes: number;
}

export default function TopicCard({ question, options, totalVotes }: TopicCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = (optionId: string) => {
    if (!hasVoted) {
      setSelectedOption(optionId);
      setHasVoted(true);
    }
  };

  const getPercentage = (votes: number) => {
    return totalVotes === 0 ? 0 : Math.round((votes / totalVotes) * 100);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 mb-8 transition-transform transform hover:scale-105">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">{question}</h2>
      <div className="space-y-4">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleVote(option.id)}
            className={`w-full text-left p-4 rounded-md relative overflow-hidden transition-all ${
              hasVoted ? 'cursor-default' : 'hover:bg-blue-50 cursor-pointer'
            } ${
              selectedOption === option.id ? 'border-2 border-blue-500' : 'border border-gray-300'
            }`}
          >
            {hasVoted && (
              <div
                className="absolute left-0 top-0 h-full bg-blue-500 bg-opacity-30 transition-all"
                style={{ width: `${getPercentage(option.votes)}%` }}
              />
            )}
            <div className="relative flex justify-between items-center">
              <span className="text-gray-700">{option.text}</span>
              {hasVoted && (
                <span className="text-sm font-medium text-gray-600">
                  {getPercentage(option.votes)}%
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}