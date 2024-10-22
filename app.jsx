/* TODO: CHANGE FONT FAMILY */


// Import React hooks
const { useState, useEffect } = React;

 function FlashcardApp() {
  // Initialize flashcards state to an empty array
  const [flashcards, setFlashcards] = useState(() => {
    // First, check if there are any flashcards stored in localStorage
    const storedFlashcards = localStorage.getItem('flashcards');
    // If there are stored flashcards, parse them and return them
    if (storedFlashcards) {
      return JSON.parse(storedFlashcards);
    }
    // If there are no stored flashcards, return an empty array
    return [];
  }); 

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  
  // Save flashcards to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
  }, [flashcards]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1
    );
  };


  const handleAddFlashcard = () => {
    if (newQuestion.trim() && newAnswer.trim()) {
      const newFlashcard = { question: newQuestion, answer: newAnswer };
      setFlashcards([...flashcards, newFlashcard]);
      setNewQuestion('');
      setNewAnswer('');
    }
  };

  const handleDeleteFlashcard = (index) => {
    setFlashcards((prevFlashcards) => {
      const newFlashcards = [...prevFlashcards];
      newFlashcards.splice(index, 1);
      return newFlashcards;
    });

    // Adjust the current index after deletion if necessary
    if (currentIndex >= flashcards.length - 1 && flashcards.length > 1) {
      setCurrentIndex(currentIndex - 1); // Move to the previous card if on the last one
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={isDarkMode ? "app dark-mode" : "app"}>
      <h1>Create Your Own Flashcards</h1>
      <div className="dark-mode-toggle">
        <button onClick={toggleDarkMode}>
         {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
      </div>
      
      <div>
        <div className="flashcard-form">
          <input
            type="text"
            placeholder="Enter question"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter answer"
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
          />
          <button onClick={handleAddFlashcard}>Add Flashcard</button>
        </div>

        {/* Flashcard display */}
        {flashcards.length > 0 && (
          <div className="flashcard-container">
            <div className={`flashcard ${isFlipped ? "is-flipped" : ""}`} onClick={handleFlip}>
              <div className="flashcard-side flashcard-front">
                {flashcards[currentIndex].question}
              </div>
              <div className="flashcard-side flashcard-back">
                {flashcards[currentIndex].answer}
              </div>
            </div>

            {/* Controls to navigate flashcards */}
            <div className="controls">
              <button onClick={handlePrev}>Previous</button>
              <button id='delete-flashcard-button' onClick={() => handleDeleteFlashcard(currentIndex)}>
                Delete This Flashcard
              </button>
              <button onClick={handleNext}>Next</button>
            </div>
          </div>
        )}

        {flashcards.length === 0 && <p>No flashcards yet. Make some!</p>}
      </div>
    </div>
  );
};


ReactDOM.render(<FlashcardApp />, document.getElementById("root"));
