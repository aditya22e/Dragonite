// Import required modules
const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config(); // Load environment variables from .env

const app = express();

// Initialize Gemini API with your API key from .env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

app.get('/suggest', async (req, res) => {
  try {
    const code = req.query.code || '';
    if (!code) {
      return res.status(400).json({ suggestion: '// Error: No code provided' });
    }
    const prompt = `Given this code: \n\n${code}\n\nSuggest the next logical line of code. Provide only the code line, no explanation.`;
    const result = await model.generateContent(prompt);
    const suggestion = result.response.text().trim();
    res.json({ suggestion });
  } catch (error) {
    console.error('Error with Gemini API:', error);
    res.status(500).json({ suggestion: '// Error: Could not generate suggestion' });
  }
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use.`);
    process.exit(1);
  }
});