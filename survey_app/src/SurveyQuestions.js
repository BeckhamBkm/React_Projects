import React, { useState, useEffect } from 'react';

function SurveyQuestions() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    async function fetchQuestions() {
      const response = await fetch('http://localhost:3001/questions');
      const data = await response.json();
      setQuestions(data);
    }

    fetchQuestions();
  }, []);

  const handleNextQuestion = (event) => {
    event.preventDefault();
    setAnswers((prevState) => ({
      ...prevState,
      [currentQuestionIndex]: event.target.answer.value,
    }));
    setCurrentQuestionIndex((prevState) => prevState + 1);
  };

  const handlePrevQuestion = (event) => {
    event.preventDefault();
    setCurrentQuestionIndex((prevState) => prevState - 1);
  };

  if (currentQuestionIndex >= questions.length) {
    return (
      <div>
        <h1>Survey completed!</h1>
        <ul>
          {questions.map((question, index) => (
            <li key={question.question_id}>
              <h3>{question.question_text}</h3>
              <p>{answers[index]}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div>
      <h1>Question {currentQuestionIndex + 1}</h1>
      <form onSubmit={handleNextQuestion}>
        <h3>{questions[currentQuestionIndex].question_text}</h3>
        {questions[currentQuestionIndex].input_type === 'numerical' && (
          <input type="number" name="answer" />
        )}
        {questions[currentQuestionIndex].input_type === 'text' && (
          <input type="text" name="answer" />
        )}
        {questions[currentQuestionIndex].input_type === 'checkbox' && (
          <>
            {questions[currentQuestionIndex].options.map((option) => (
              <div key={option}>
                <input type="checkbox" id={option} name="answer[]" value="Option 1" />
                <label htmlFor={option}>{option}</label>
              </div>
            ))}
          </>
        )}
        {questions[currentQuestionIndex].input_type === 'multiple_select' && (
          <select name="answer" multiple>
            {questions[currentQuestionIndex].options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}
        <button type="submit">Next</button>
        {currentQuestionIndex > 0 && (
          <button onClick={handlePrevQuestion}>Previous</button>
        )}
      </form>
    </div>
  );
}

export default SurveyQuestions;
