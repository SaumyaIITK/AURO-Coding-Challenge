const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, 
});

const openai = new OpenAIApi(configuration);


const app = express();


// Middleware
app.use(cors());
app.use(express.json());



// JDoodle Configuration
const JDoodleConfig = {
  clientId: process.env.JDOODLE_CLIENT_ID || "YOUR_CLIENT_ID",
  clientSecret: process.env.JDOODLE_CLIENT_SECRET || "YOUR_CLIENT_SECRET",
};

// API to Run User Code
app.post("/api/runcode", async (req, res) => {
  const { script, language = "python3" } = req.body;

  if (!script || typeof script !== "string") {
    return res.status(400).json({ success: false, error: "'script' is required and should be a valid string." });
  }

  const requestData = {
    clientId: JDoodleConfig.clientId,
    clientSecret: JDoodleConfig.clientSecret,
    script,
    language,
    compileOnly: false,
  };

  try {
    const response = await fetch("https://api.jdoodle.com/v1/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    });

    const data = await response.json();

    if (response.ok && data.output) {
      res.status(200).json({ success: true, output: data.output });
    } else {
      res.status(200).json({ success: false, error: data.error || data.exception || "Unknown error." });
    }
  } catch (error) {
    console.error("Error while executing code:", error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// API to Generate Mock Questions
app.post("/generate-mock-questions", async (req, res) => {
  const { number = 5, difficulty = "Medium", category = "Arrays" } = req.body;

  const prompt = `
    Generate ${number} mock coding questions of ${difficulty} difficulty in the ${category} category. 
    Each question should include:
    - id: unique integer
    - title: string (name of the problem)
    - description: detailed problem statement
    - testCases: an array of inputs
    - expectedOutputs: an array of corresponding outputs
    Provide the response as a JSON array.
  `;

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 2000,
    });

    res.json({ questions: JSON.parse(response.data.choices[0].text) });
  } catch (error) {
    console.error("Failed to generate questions:", error.message);
    res.status(500).json({ error: "Failed to generate questions", message: error.message });
  }
});

// API to Analyze User Code
app.post("/analysescore", async (req, res) => {
  const { script, currentQuestion } = req.body;

  if (!script || !currentQuestion) {
    return res.status(400).json({ error: "Both 'script' and 'currentQuestion' are required." });
  }

  const prompt = `
    Analyze the following script based on the given coding question:
    Question: ${JSON.stringify(currentQuestion)}
    Script: ${script}
    Provide:
    - A time complexity analysis
    - Possible improvements
    - A score out of 100
    Respond in a structured plain text format.
  `;

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 1500,
    });

    res.json({ analysis: response.data.choices[0].text });
  } catch (error) {
    console.error("Failed to analyze code:", error.message);
    res.status(500).json({ error: "Failed to analyze code", message: error.message });
  }
});

// API to Handle Code Submission
app.post("/submit-code", (req, res) => {
  const { code, language } = req.body;

  if (!code || !language) {
    return res.status(400).json({ success: false, message: "Code and language are required." });
  }

  res.json({ success: true, message: `Code received in ${language} successfully!` });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
