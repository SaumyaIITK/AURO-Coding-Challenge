import React from 'react';
import { Trophy } from 'lucide-react';

const mockLeaderboard = [
  { rank: 1, name: "Saumya Kumari", score: 3000, solved: 150 },
  { rank: 2, name: "Coding Champ", score: 2700, solved: 138 },
  { rank: 3, name: "The Decoder", score: 2500, solved: 132 },
  { rank: 4, name: "The Coder", score: 2200, solved: 129 },
  { rank: 5, name: "Saumya IITK", score: 1800, solved: 120 },
];

export const LeaderBoard: React.FC = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-xl font-bold">Leaderboard</h2>
      </div>
      <div className="space-y-4">
        {mockLeaderboard.map((user) => (
          <div
            key={user.rank}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <span className={`font-bold ${
                user.rank === 1 ? 'text-yellow-700' :
                user.rank === 2 ? 'text-gray-700' :
                user.rank === 3 ? 'text-gray-700' : 'text-gray-700'
              }`}>#{user.rank}</span>
              <span className="font-medium">{user.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{user.solved} solved</span>
              <span className="font-semibold text-indigo-600">{user.score}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};