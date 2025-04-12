import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';  

const QuizApp = () => {
  const [quizData, setQuizData] = useState(null);

  useEffect(() => {
    // Function to fetch quiz data from your backend
    const fetchQuizData = async () => {
      try {
        const response = await axios.post('http://localhost:3000/generateQuiz', {
          topic: "Science",
          difficulty: "easy"
        });
        setQuizData(response.data); // Set response data to state
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };

    fetchQuizData(); // Call the function on initial load
  }, []); // Empty dependency array to run once when the component mounts

  const handleAnswer = (questionIndex, answer) => {
    if (quizData) {
      const correctAnswer = quizData.questions[questionIndex].answer;
      alert(answer === correctAnswer ? "Correct!" : "Wrong Answer!");
    }
  };

  return (
    <div>
      <h1>Quiz</h1>
      {quizData ? (
        <div>
          {quizData.questions.map((question, index) => (
            <div key={index}>
              <p>{question.question}</p>
              {question.options.map((option, i) => (
                <button key={i} onClick={() => handleAnswer(index, option)}>
                  {option}
                </button>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p>Loading quiz data...</p>
      )}
    </div>
  );
};

export default QuizApp;
