import express from 'express';
import cors from 'cors';  // Importing CORS to handle cross-origin requests
import bodyParser from 'body-parser';

const app = express();

// Enable CORS for the frontend (running on port 5174 in this case)
app.use(cors({
  origin: "http://localhost:5175", // The port your frontend is running on
}));

// Parse incoming JSON requests
app.use(bodyParser.json());

// Handle POST requests to '/generateQuiz'
app.post('/generateQuiz', (req, res) => {
  const { topic, difficulty } = req.body;

  // Generate static quiz data based on topic and difficulty (you can later enhance this to be dynamic)
  const quizData = {
    questions: [
      {
        question: "What is 2+2?",
        options: ["3", "4", "5", "6"],
        answer: "4",
      },
      {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "London"],
        answer: "Paris",
      },
    ],
  };

  res.json(quizData); // Send the generated quiz data back to the frontend
});

// Start the server on port 3000
app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
