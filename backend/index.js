const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const pdf = require('pdfkit');

const app = express();
const PORT = process.env.PORT || 5000;

const dummyData = require('./dummyData.json');

app.use(bodyParser.json());

const fetchChatHistory = () => {
  return dummyData;
};

app.get('/api/chat/history', (req, res) => {
  const chatHistory = fetchChatHistory();
  res.json(chatHistory);
});

app.get('/api/chat/export/pdf', (req, res) => {
  const chatHistory = fetchChatHistory();
  const doc = new pdf();
  const fileName = 'chat-history.pdf';

  doc.pipe(fs.createWriteStream(fileName));

  doc.text('Chat History:');
  chatHistory.forEach((item, index) => {
    doc.text(`Question ${index + 1}: ${item.question}`);
    doc.text(`Answer ${index + 1}: ${item.answer}`);
    doc.moveDown();
  });

  doc.end();

  res.download(fileName);
});


app.post('/api/feedback', (req, res) => {
  const { feedback } = req.body;

  console.log('Feedback received:', feedback);
  
  res.sendStatus(200);
});


app.post('/api/ask', (req, res) => {
  const { question } = req.body;

  
  const answer = 'This is a placeholder answer.';
  
  res.json({ answer });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
