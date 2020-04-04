import React, { useState, useEffect } from 'react';
import css from './playgame.module.css';

//contains:
//display - current displayWord (updating as played)
//input and submit button for guesses (conditionally rendered if gameFinished = false)
//play again button

function PlayGame({
  setPlayerGuess,
  displayWord,
  playerGuess,
  checkGuess,
  restartGame,
  gameFinished
}) {
  function handleUserInput(e) {
    const input = e.target.value;
    //regex makes sure only letters can be entered
    if (input.match(/[a-zA-Z]/g)) {
      setPlayerGuess(input.toLowerCase());
    } else {
      setPlayerGuess('');
    }
  }

  function handleEnterPress(e) {
    const code = e.keyCode;
    console.log(code);
    if (code === 13) {
      checkGuess(playerGuess);
    }
  }

  return (
    <div>
      {!gameFinished && (
        <div className={css.wordDisplay}>
          {displayWord.map(letter => (
            <p>{letter}</p>
          ))}
        </div>
      )}

      {!gameFinished && (
        <div>
          <input
            value={playerGuess}
            onChange={handleUserInput}
            placeholder="Guess a letter here"
            maxLength="1"
            className={css.guessInput}
            onKeyDown={handleEnterPress}
          />
          <button onClick={() => checkGuess(playerGuess)}>Submit Answer</button>
        </div>
      )}

      <div>
        <button onClick={restartGame} className={css.resetButton}>
          Play Again!
        </button>
      </div>
    </div>
  );
}
export default PlayGame;
