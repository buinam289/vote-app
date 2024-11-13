import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const MOCK_TOPICS = [
  {
    id: '1',
    question: "What's your favorite programming language?",
    options: [
      { id: '1a', text: 'JavaScript', totalVotes: 150 },
      { id: '1b', text: 'Python', totalVotes: 120 },
      { id: '1c', text: 'Java', totalVotes: 80 },
      { id: '1d', text: 'TypeScript', totalVotes: 200 }
    ],
    tags: ['Programming', 'Technology'],
    totalVotes: 550
  },
  {
    id: '2',
    question: "Which city would you like to live in?",
    options: [
      { id: '2a', text: 'New York', totalVotes: 300 },
      { id: '2b', text: 'London', totalVotes: 280 },
      { id: '2c', text: 'Tokyo', totalVotes: 250 },
      { id: '2d', text: 'Paris', totalVotes: 220 }
    ],
    tags: ['Travel', 'Lifestyle'],
    totalVotes: 1050
  },
  {
    id: '3',
    question: "What's your preferred way of working?",
    options: [
      { id: '3a', text: 'Remote', totalVotes: 400 },
      { id: '3b', text: 'Hybrid', totalVotes: 320 },
      { id: '3c', text: 'Office', totalVotes: 180 }
    ],
    tags: ['Work', 'Lifestyle'],
    totalVotes: 900
  }
];

async function main() {
  console.log('Start seeding ...');

  const existingTopics = await prisma.topic.findMany();
  if (existingTopics.length > 0) {
    console.log('Data already exists. Skipping seeding.');
    return;
  }

  for (const topic of MOCK_TOPICS) {
    const createdTopic = await prisma.topic.create({
      data: {
        id: topic.id,
        question: topic.question,
        totalVotes: topic.totalVotes,
        options: {
          create: topic.options.map(option => ({
            id: option.id,
            text: option.text,
            totalVotes: option.totalVotes
          }))
        },
        tags: {
          create: topic.tags.map(tag => ({
            tag: {
              connectOrCreate: {
                where: { name: tag },
                create: { name: tag }
              }
            }
          }))
        }
      }
    });
    console.log(`Created topic with id: ${createdTopic.id}`);
  }

  console.log('Seeding finished.');
}

export default main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });