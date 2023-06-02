const router = require('express').Router();
const Answer = require('../models/answers.model');

// GET method
router.get('/', async (req, res) => {
  try {
    const answers = await Answer.find();
    res.status(200).json(answers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Error retrieving answers: ${err.message}` });
  }
});

router.post('/', async (req, res) => {
  try {
    const { answers, userId } = req.body;

    // Find the existing answer document for the user
    let existingAnswer = await Answer.findOne({ userId });

    if (existingAnswer) {
      // If an answer document already exists, update the answers array
      existingAnswer.answers = answers;
      await existingAnswer.save();
      res.status(200).json(existingAnswer);
    } else {
      // If no answer document exists, create a new one
      const newAnswer = await Answer.create({ userId, answers });
      res.status(201).json(newAnswer);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Error creating answer: ${err.message}` });
  }
});

module.exports = router;
