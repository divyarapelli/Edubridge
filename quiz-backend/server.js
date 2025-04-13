import express from 'express';
const app = express();
const port = 5000;

const quizzes = {
  geography: [
    { question: "What is the capital of France?", options: ["Paris", "Berlin", "London", "Rome"], answer: "Paris" },
    { question: "Which ocean is the largest?", options: ["Pacific Ocean", "Atlantic Ocean", "Indian Ocean", "Arctic Ocean"], answer: "Pacific Ocean" }
  ],
  science: [
    { question: "What is the chemical symbol for water?", options: ["H2O", "CO2", "O2", "N2"], answer: "H2O" },
    { question: "What is the hardest natural substance?", options: ["Gold", "Iron", "Diamond", "Platinum"], answer: "Diamond" }
  ],
};

app.get('/api/quiz/:topic', (req, res) => {
  const topic = req.params.topic.toLowerCase();
  if (quizzes[topic]) {
    res.json(quizzes[topic]);
  } else {
    res.status(404).json({ message: 'Quiz not found for this topic' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
