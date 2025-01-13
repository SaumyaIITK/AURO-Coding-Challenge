import React from 'react';

const topics = [
  { id: 1, name: 'Arrays' },
  { id: 2, name: 'Strings' },
  { id: 3, name: 'Linked Lists' },
  { id: 4, name: 'Stacks' },
  { id: 5, name: 'Queues' },
  { id: 6, name: 'Trees' },
  { id: 7, name: 'Graphs' },
  { id: 8, name: 'Recursion' },
  { id: 9, name: 'Backtracking' },
  { id: 10, name: 'DP' },
  { id: 11, name: 'Greedy' },
  { id: 12, name: 'Sorting' },
  { id: 13, name: 'Searching' },
  { id: 14, name: 'Hashing' },
  { id: 15, name: 'Bit Manipulation' },
  { id: 16, name: 'Mathematics' },
  { id: 17, name: 'Trie' },
  { id: 18, name: 'Sliding Window' },
  { id: 19, name: 'Segment Tree' },
  { id: 20, name: 'Fenwick Tree' },
  { id: 21, name: 'Heap' },
  { id: 22, name: 'Union-Find' },
];

interface TopicSelectorProps {
  selectedTopic: string;
  onSelectTopic: (topic: string) => void;
}

export const TopicSelector: React.FC<TopicSelectorProps> = ({
  selectedTopic,
  onSelectTopic,
}) => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
      {topics.map(({ id, name }) => (
        <button
          key={id}
          onClick={() => onSelectTopic(name)}
          className={`w-30 h-12 rounded-md flex flex-col items-center justify-center text-xs transition-all
            ${
              selectedTopic === name
                ? 'bg-indigo-500 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
        >
          <span className="font-large">{name}</span>
        </button>
      ))}
    </div>
  );
};
