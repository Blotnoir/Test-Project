
import { handlePrev } from './app.jsx';
import { describe, it, expect } from 'vitest';


describe('handlePrev', () => {
  it('decrements the current index, wrapping if necessary', () => {
    const flashcards = ['card1', 'card2', 'card3'];
    const [currentIndex, setCurrentIndex] = React.useState(1);
    const [isFlipped, setIsFlipped] = React.useState(false);

    handlePrev({ flashcards, currentIndex, setCurrentIndex, isFlipped, setIsFlipped });

    expect(currentIndex).toBe(0);
  });

  it('sets isFlipped to false', () => {
    const flashcards = ['card1', 'card2', 'card3'];
    const [currentIndex, setCurrentIndex] = React.useState(1);
    const [isFlipped, setIsFlipped] = React.useState(true);

    handlePrev({ flashcards, currentIndex, setCurrentIndex, isFlipped, setIsFlipped });

    expect(isFlipped).toBe(false);
  });

  it('sets currentIndex to the last index if it is currently at 0', () => {
    const flashcards = ['card1', 'card2', 'card3'];
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [isFlipped, setIsFlipped] = React.useState(false);

    handlePrev({ flashcards, currentIndex, setCurrentIndex, isFlipped, setIsFlipped });

    expect(currentIndex).toBe(flashcards.length - 1);
  });
});
