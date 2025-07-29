'use client';

import { useState } from 'react';
import clsx from 'clsx';

export default function FlashCard({
  front,
  back,
}: {
  front: string;
  back: string;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="w-full perspective cursor-pointer"
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={clsx(
          "relative h-48 transition-transform duration-500 transform-style-preserve-3d",
          flipped ? "rotate-y-180" : ""
        )}
      >
        {/* Front */}
        <div className="absolute inset-0 bg-white dark:bg-gray-800 rounded-xl shadow-md border p-4 backface-hidden flex items-center justify-center text-xl font-bold text-blue-700 dark:text-blue-300">
          {front}
        </div>

        {/* Back */}
        <div className="absolute inset-0 bg-blue-50 dark:bg-gray-900 rounded-xl shadow-md border p-4 rotate-y-180 backface-hidden flex items-center justify-center text-gray-800 dark:text-gray-300 text-sm">
          {back}
        </div>
      </div>
    </div>
  );
}
