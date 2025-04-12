// App.js
import React from 'react';
import QuizApp from './QuizApp'; // Import the new QuizApp component

const App = () => {
  return (
    <div className="App">
      <h1>Welcome to the AI Quiz Application</h1>
      <QuizApp /> {/* Use the QuizApp component here */}
    </div>
  );
};

export default App;
