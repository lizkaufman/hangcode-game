import React from 'react';
import css from './hangman.module.css';

function Hangman({ displayHangman, setDisplayMessage, setGameFinished }) {
  switch (displayHangman) {
    case 0:
      return (
        <div>
          <p></p>
        </div>
      );
    case 1:
      return (
        <div className={css.hangman}>
          <p>|</p>
        </div>
      );
    case 2:
      return (
        <div className={css.hangman}>
          <p>|</p>
          <p>C</p>
        </div>
      );
    case 3:
      return (
        <div className={css.hangman}>
          <p>|</p>
          <p>C</p>
          <p>O</p>
        </div>
      );
    case 4:
      return (
        <div className={css.hangman}>
          <p>|</p>
          <p>C</p>
          <p>O</p>
          <p>D</p>
        </div>
      );
    case 5:
      setDisplayMessage(
        `Sorry, you didn't guess in time and hung your code! Press restart to play again.`
      );
      setGameFinished(true);
      return (
        <div className={css.hangman}>
          <p>|</p>
          <p>C</p>
          <p>O</p>
          <p>D</p>
          <p>E</p>
        </div>
      );
    default:
      return (
        <div className={css.hangman}>
          <p>Game over. Press restart to play again.</p>
        </div>
      );
  }
}

export default Hangman;
