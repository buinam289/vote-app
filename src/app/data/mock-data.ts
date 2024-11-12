export const MOCK_TOPICS = [
  {
    id: '1',
    question: "What's your favorite programming language?",
    options: [
      { id: '1a', text: 'JavaScript', votes: 150 },
      { id: '1b', text: 'Python', votes: 120 },
      { id: '1c', text: 'Java', votes: 80 },
      { id: '1d', text: 'TypeScript', votes: 200 }
    ],
    totalVotes: 550
  },
  {
    id: '2',
    question: "Which city would you like to live in?",
    options: [
      { id: '2a', text: 'New York', votes: 300 },
      { id: '2b', text: 'London', votes: 280 },
      { id: '2c', text: 'Tokyo', votes: 250 },
      { id: '2d', text: 'Paris', votes: 220 }
    ],
    totalVotes: 1050
  },
  {
    id: '3',
    question: "What's your preferred way of working?",
    options: [
      { id: '3a', text: 'Remote', votes: 400 },
      { id: '3b', text: 'Hybrid', votes: 320 },
      { id: '3c', text: 'Office', votes: 180 }
    ],
    totalVotes: 900
  }
];