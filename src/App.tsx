import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { TestPage } from './pages/TestPage';

function App() {
  return (
    <div className="bg-blue-800 min-h-screen"> {/* Light blue background */}
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;