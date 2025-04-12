const questions = [
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
      correct: "Paris"
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      correct: "Mars"
    },
    {
      question: "What is the largest mammal?",
      options: ["Elephant", "Blue Whale", "Shark", "Giraffe"],
      correct: "Blue Whale"
    }
  ];
  
  let currentQuestionIndex = 0;
  
  function displayQuestion() {
    const questionContainer = document.getElementById('question-container');
    const optionsContainer = document.getElementById('options-container');
    const nextButton = document.getElementById('next-btn');
  
    const question = questions[currentQuestionIndex];
    questionContainer.textContent = question.question;
  
    optionsContainer.innerHTML = "";
    question.options.forEach(option => {
      const optionElement = document.createElement('div');
      optionElement.classList.add('option');
      optionElement.textContent = option;
      optionElement.addEventListener('click', () => checkAnswer(option));
      optionsContainer.appendChild(optionElement);
    });
  
    nextButton.disabled = true;
  }
  
  function checkAnswer(selectedOption) {
    const question = questions[currentQuestionIndex];
    const nextButton = document.getElementById('next-btn');
  
    if (selectedOption === question.correct) {
      alert('Correct Answer!');
    } else {
      alert('Wrong Answer!');
    }
  
    nextButton.disabled = false;
  }
  
  document.getElementById('next-btn').addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      displayQuestion();
    } else {
      alert('Quiz Completed!');
    }
  });
  
  // Initialize the first question
  displayQuestion();
  