import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Play } from 'lucide-react';

interface CodeEditorProps {
  code: string;
  onChange: (value: string) => void;
  onRun: (language: string) => void;
  clickanalyse: () => void;
  output: string;
  question: string;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  onChange,
  onRun,
  output,
  clickanalyse,
  question,
}) => {
  const [leftWidth, setLeftWidth] = useState(50); // Left column width percentage
  const [language, setLanguage] = useState('python'); // Default language

  // Handle resizing of columns
  const handleResize = (e: MouseEvent) => {
    const newLeftWidth = (e.clientX / window.innerWidth) * 100;
    setLeftWidth(Math.max(20, Math.min(newLeftWidth, 80))); // Restrict width between 20% and 80%
  };

  return (
    <div className="flex h-screen">
      {/* Left Column: Question */}
      <div
        className="bg-grey-100 p-2 overflow-y-auto shadow-md"
        style={{ flexBasis: `${leftWidth}%`, flexShrink: 0 }}
      >
        <h2 className="text-lg font-semibold mb-4">1. Two Sum Problem</h2>
        <p className="text-gray-700">{question || 'No question available'}</p>
        <br />
        <h3>Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.</h3>
        <br />
        <h3>You may assume that each input would have exactly one solution, and you may not use the same element twice.</h3>
        <br />
        <h3>You can return the answer in any order</h3>
        <br />
        <h3>Example:</h3>
        <p>
          <strong>Input:</strong> nums = [2, 7, 11, 15], target = 9
        </p>
        <p>
          <strong>Output:</strong> [0, 1]
        </p>
        <p>
          Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
        </p>
        <br />
        <h4>
          <strong>Follow-up:</strong> Can you come up with an algorithm that is less than O(n²)
          time complexity?
        </h4>
      </div>

      {/* Resizable Divider */}
      <div
        className="cursor-col-resize bg-gray-300 w-2"
        onMouseDown={(e) => {
          e.preventDefault();
          const handleMouseMove = (e: MouseEvent) => handleResize(e);
          const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
          };
          document.addEventListener('mousemove', handleMouseMove);
          document.addEventListener('mouseup', handleMouseUp);
        }}
      />

      {/* Right Column: Code Editor */}
      <div className="flex-grow bg-white p-4 shadow-md flex flex-col">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <div>
            <h2 className="text-lg font-semibold">Select Language</h2>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="border border-gray-300 p-2 rounded"
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
            </select>
          </div>
          <button
            onClick={() => onRun(language)}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center"
          >
            <Play className="w-4 h-4" />
            Run Code
          </button>
        </div>

        <Editor
          height="100%"
          language={language}
          value={code}
          onChange={(value) => onChange(value || '')}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
          }}
          
        />
         <div className="bg-gray-900 text-white p-4 rounded-lg mb-4">
          <h3 className="text-sm text-gray-400 mb-2">Output:</h3>
          <pre className="font-mono text-sm">{output || 'Run the code to see the output'}</pre>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={clickanalyse}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
          >
            Ask AI
          </button>
        </div>
      </div>
    </div>
  );
};
