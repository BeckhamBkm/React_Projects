const router = require('express').Router();
let Question = require('../models/questions.model');

router.get('/', async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'Error retrieving questions'});
  }
});
    
  module.exports = router;