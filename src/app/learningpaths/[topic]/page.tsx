'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import FlashCard from '@/components/custom/FlashCard';

const topics = {
  stocks: {
    title: "Stocks & ETFs",
    cards: [
      { front: "What is a Stock?", back: "A stock represents partial ownership in a company." },
      { front: "What is an ETF?", back: "An ETF is a collection of stocks you can buy together." },
      { front: "What is a Dividend?", back: "A dividend is a portion of company profit shared with shareholders." },
      { front: "What is P/E Ratio?", back: "Price-to-Earnings ratio helps value a company by comparing price and earnings." },
    ],
  },
  banks: {
    title: "How Banks Work",
    cards: [
      { front: "What is Interest?", back: "Interest is the cost of borrowing money or the reward for saving it." },
      { front: "What is a Loan?", back: "Money borrowed from a bank, paid back with interest over time." },
    ],
  },
};

export default function TopicPage(props: { params: Promise<{ topic: string }> }) {
  const { topic } = use(props.params); // ✅ unwrap params properly
  const topicData = topics[topic as keyof typeof topics];

  if (!topicData) return notFound();

  return (
    <main className="max-w-3xl mx-auto p-8 space-y-6">
      <h1 className="text-3xl font-bold">{topicData.title}</h1>
      <p className="text-gray-600">Flip the cards to learn each concept.</p>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
        {topicData.cards.map((card, idx) => (
          <FlashCard key={idx} front={card.front} back={card.back} />
        ))}
      </div>
    </main>
  );
}
