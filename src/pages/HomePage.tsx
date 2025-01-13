import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopicSelector } from '../components/TopicSelector';
import { LeaderBoard } from '../components/LeaderBoard';
import { Pie } from 'react-chartjs-2';
import { Banner } from '../components/Banner';


import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

export const Navbar: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Contest'); // Default active tab

  const tabs = ['Contest', 'Challenge', 'Resources', 'Courses'];

  return (
    <nav className="bg-blue-50 shadow-md p-4 fixed top-0 left-0 w-full z-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="assets/logo.png" 
            alt="Logo"
            className="h-8"
          />
          <span className="ml-2 text-x2 font-bold text-indigo-600">AURO.edu</span>
        </div>

        {/* Tabs */}
        <div className="flex gap-10">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-lg font-medium ${
                activeTab === tab
                  ? 'text-indigo-600'
                  : 'text-gray-700 hover:text-indigo-500-strong'
              } no-underline`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Login Button */}
        <div>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

// Register chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface ProgressPieChartProps {
  attempted: number; // Total attempted questions
  solved: number;    // Number of solved questions
  total: number;     // Total questions in the challenge
}

export const ProgressPieChart: React.FC<ProgressPieChartProps> = ({
  attempted,
  solved,
  total,
}) => {
  const unsolved = total - attempted; // Questions not attempted
  const notSolved = attempted - solved; // Questions attempted but not solved

  const data = {
    labels: ['Solved', 'Attempted but Not Solved', 'Unsolved'],
    datasets: [
      {
        data: [solved, notSolved, unsolved],
        backgroundColor: ['#6A0DAD', '#4A90E2', '#E2E2E2'], // Colors for each segment
        hoverBackgroundColor: ['#7B1ECF', '#5AA3F2', '#D6D6D6'], // Hover colors
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          font: {
            size: 12,
            family: 'Arial, sans-serif',
          },
          color: '#4A4A4A',
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-gray-100 p-4 rounded-md shadow-md">
      <h3 className="text-sm font-semibold mb-4 text-center text-gray-700">
        My Progress
      </h3>
      <div
        className="flex justify-center items-center"
        style={{
          width: '200px',
          height: '200px',
          margin: '0 auto',
        }}
      >
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState('');
  const [difficulty, setDifficulty] = useState('Easy');
  const [questionCount, setQuestionCount] = useState(5);

  const handleStartTest = () => {
    if (!selectedTopic) {
      alert('Please choose a topic');
      return;
    }
    navigate('/test', {
      state: { topic: selectedTopic, difficulty, questionCount },
    });
  };

  return (
    <div className="min-h-screen bg-blue-50 py-12 sm:px-6 lg:px-8">
      {/* Navbar */}
      <Navbar />
      {/* Banner at the Top */}
      <Banner
        icon="assets/trophy.png" // Replace with your icon path
        title="AURO Contest"
        subtitle="Participate in weekly contests and climb the leaderboard!"
      />
      <div className="max-w-7xl mx-auto">
      
        <div className="text-center mb-12">
          
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h2 className="text-xl font-bold mb-4">Select Topic</h2>
              <TopicSelector
                selectedTopic={selectedTopic}
                onSelectTopic={setSelectedTopic}
              />
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <h2 className="text-xl font-bold mb-4">Let's Start Practicing</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Difficulty Level
                  </label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Questions
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={questionCount}
                    onChange={(e) => setQuestionCount(Number(e.target.value))}
                    className="w-full p-2 border rounded-md"
                  />
                </div>

                <button
                  onClick={handleStartTest}
                  className="w-full bg-indigo-600 text-white py-3 rounded-md hover:'bg-indigo-500 text-white'  transition-colors"
                >
                  Start Challenge
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
  {/* Flex Container for Vertical Layout */}
  <div className="flex flex-col gap-4">
    {/* My Progress Pie Chart */}
    <ProgressPieChart attempted={20} solved={12} total={30} />



    {/* LeaderBoard (Leadership Box) */}
    <LeaderBoard />
  </div>
</div>
        </div>
      </div>
    </div>
  );
};