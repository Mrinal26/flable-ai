const fetch = require('node-fetch');
require('dotenv').config();

const apiKey = process.env.OPENAI_API_KEY;
const apiUrl = 'https://api.openai.com/v1/completions';

exports.generateResponse = async (question) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    };

    const body = JSON.stringify({
      model: 'text-davinci-002',
      prompt: question,
      max_tokens: 100
    });

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body
    });

    const data = await response.json();
    return data.choices[0].text.trim();
  } catch (error) {
    throw error;
  }
};
