const openaiService = require('../services/openaiService');

exports.askQuestion = async (req, res, next) => {
  try {
    const { question } = req.body;
    const response = await openaiService.generateResponse(question);
    res.json({ answer: response });
  } catch (error) {
    next(error);
  }
};
