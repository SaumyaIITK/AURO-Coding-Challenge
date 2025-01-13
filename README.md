AI-Powered Coding Platform

Overview

This project is an AI-powered coding platform that allows users to practice coding challenges in various programming languages with real-time feedback and analysis. It features a clean user interface, dynamic question generation, real-time code execution, and insightful performance analysis.

Features

Dynamic Code Editor:
Supports multiple programming languages, including Python, JavaScript, Java, and C++.

Syntax highlighting and real-time error detection.

Real-Time Code Execution:

Execute code on a secure server with live output.

Question Generation:

AI-driven mock question generation based on difficulty and category.
Includes test cases and expected outputs.

Performance Analysis:

Analyze submitted code for time complexity and provide improvement hints.
AI-driven score and feedback.

User-Friendly Design:

Responsive layout with intuitive navigation.
Progress tracking and leaderboard functionality.

Technology Stack

Frontend:

React with TypeScript
Tailwind CSS for styling
Chart.js for visual progress representation

Backend:

Node.js with Express
Integration with OpenAI API for AI-based features
JDoodle API for real-time code execution

Database:

MongoDB Atlas (optional for user and progress data)

Installation and Setup

Prerequisites

Node.js (v16 or higher)
npm or yarn

Clone the Repository

git clone https://github.com/your-username/ai-powered-coding-platform.git
cd ai-powered-coding-platform

Install Dependencies

Frontend

cd frontend
npm install

Backend

cd ../backend
npm install

Set Up Environment Variables

Create a .env file in the backend directory.

Add the following variables:

OPENAI_API_KEY=your_openai_api_key
JDOODLE_CLIENT_ID=your_jdoodle_client_id
JDOODLE_CLIENT_SECRET=your_jdoodle_client_secret
PORT=3000

Run the Application

after npm install
npm run dev

The application will be accessible at http://localhost:3000.

Project Structure

AI-powered-coding-platform/
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/
│   ├── index.js
│   └── package.json
└── README.md

Frontend: Contains the React app for the user interface.

Backend: Contains the server logic for API endpoints and AI integrations.

API Endpoints

Backend Endpoints

POST /api/runcode:

Executes the user-provided code and returns the output.

POST /generate-mock-questions:

Generates coding questions based on difficulty and category.

POST /analysescore:

Analyzes the user's code and provides feedback.


