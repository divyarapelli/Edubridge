import React, { useState, useEffect } from 'react';

function QuizApp() {
  const [topic, setTopic] = useState('');
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  // Dummy correct answers for each question (for scoring purposes)
  const correctAnswers = {
    'What is 2 + 2?': '4',
    'What is the capital of France?': 'Paris',
    'What is 10 / 2?': '5',
    'Which continent is Egypt located in?': 'Africa',
  };

  // Fetch quiz data based on selected topic
  const fetchQuizData = (topic) => {
    setLoading(true);
    fetch(`http://localhost:5000/api/quiz/${topic}`)
      .then((response) => response.json())
      .then((data) => {
        setQuizData(data);  // Set the quiz data
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to load quiz data:', error);
        setLoading(false);
      });
  };

  // Handle topic selection
  const handleTopicSelection = (event) => {
    setTopic(event.target.value);
    if (event.target.value) {
      fetchQuizData(event.target.value);  // Fetch quiz data when topic is selected
    } else {
      setQuizData([]);  // Clear quiz data if no topic is selected
    }
  };

  // Handle answer selection
  const handleAnswerSelection = (question, answer) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [question]: answer,
    }));
  };

  // Calculate score
  const calculateScore = () => {
    return Object.keys(selectedAnswers).reduce((score, question) => {
      return selectedAnswers[question] === correctAnswers[question] ? score + 1 : score;
    }, 0);
  };

  return (
    <div>
      <h1>Quiz App</h1>

      <div>
        <h3>Select a Quiz Topic</h3>
        <select onChange={handleTopicSelection} value={topic}>
          <option value="">Select Topic</option>
          <option value="Math">Math</option>
          <option value="Geography">Geography</option>
        </select>
      </div>

      {loading && <p>Loading quiz...</p>}

      {quizData.length > 0 && (
        <div>
          {quizData.map((questionData, index) => (
            <div key={index}>
              <p>{questionData.question}</p>
              <ul>
                {questionData.options.map((option, i) => (
                  <li key={i}>
                    <button
                      onClick={() => handleAnswerSelection(questionData.question, option)}
                      style={{
                        backgroundColor:
                          selectedAnswers[questionData.question] === option
                            ? 'lightblue'
                            : 'white',
                      }}
                    >
                      {option}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3>Your Score: {calculateScore()} / {quizData.length}</h3>
          </div>
        </div>
      )}

      {quizData.length === 0 && !loading && topic && (
        <p>No quiz available for this topic</p>
      )}
    </div>
  );
}

export default QuizApp;
