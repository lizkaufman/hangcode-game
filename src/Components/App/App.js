import React, { useState, useEffect } from 'react';
import noose from './images/noose.png';

import './App.css';
import PlayGame from '../Playgame/index';
import Message from '../Message/index';
import Hangman from '../Hangman/index';

/*
INITIAL PLAN:
//TODO: Array of words -> pick at random
    -Array of arrays with the words already split, one letter per string 
//TODO: Represent initial word as '-' for each letter w/ state to change letters w/ guesses (the olllllll' spread and slice)
//TODO: Hangman parts displayed with each guess (needs functionality - counter of right/wrong, conditional rendering)
//TODO: Message area - playing/won/lost etc.
    -Conditional rendering based on status in gameStatus state 
//TODO: Guessing input field and button (w/ state)
//TODO: Logic to match the guess with the letters in the word and then respond accordingly
    -For loop iterating thru each letter of the word and checking them against the value of the playerGuess state, with if statement in the for loop 
    -If matching, then need to switch that letter out with the playerGuess letter on the board 
    -If not, have a way to trigger the hangman part displaying next 
*/

let playerGuessRecord = []; //this will keep track of guesses to deal with duplicates

function App() {
  const [playerGuess, setPlayerGuess] = useState('');
  const [displayedWord, setDisplayedWord] = useState(['-', '-', '-', '-', '-']);
  const [chosenWord, setChosenWord] = useState(['-', '-', '-', '-', '-']);
  const [displayHangman, setDisplayHangman] = useState(0); //counts up w/ each incorrect guess; triggers conditional render of hangman
  const [displayMessage, setDisplayMessage] = useState('');
  //Array of five letter words.
  const [gameResultMessage, setGameResultMessage] = useState('');
  const [gameFinished, setGameFinished] = useState(false);
  //

  //
  const wordBank = [
    ['r', 'e', 'a', 'c', 't'],
    ['s', 't', 'a', 't', 'e'],
    ['i', 'n', 'p', 'u', 't'],
    ['v', 'a', 'l', 'u', 'e'],
    ['p', 'r', 'o', 'p', 's'],
    ['i', 'n', 'd', 'e', 'x'],
    ['h', 'o', 'o', 'k', 's'],
    ['e', 'p', 'i', 'c', 's'],
    ['f', 'i', 'l', 'e', 's'],
    ['l', 'i', 'n', 'k', 's'],
  ];
  useEffect(
    //use Math.random() to generate a number between 0 and 1
    //multiply that decimal by 10 and then floor it -> to get the index
    //setChosenWord(words[index])
    () => {
      setChosenWord(wordBank[Math.floor(Math.random() * 10)]);
    },
    []
  );

  console.log(chosenWord); //NOTE: just in here for testing purposes!

  function checkGuess(playerGuess) {
    //Function to take in the playerGuess letter and (for) loop through the chosenWord array to check if there's a match
    //Check for duplicate guess
    //If statement: if it matches, it needs to:
    //--Display a message in a message component that you guessed right
    //--Replace the relevant letter (using index!) in the displayedWord with the letter
    //If it doesn't match:
    //--Display a message - incorrect guess - in message component
    //--Increment up the displayHangman state
    let matchFound = false;
    for (let i = 0; i < playerGuessRecord.length; i++) {
      //checks for duplicate guesses against the array of letters already guessed
      if (playerGuessRecord[i] === playerGuess) {
        //handles duplicate if found:
        setDisplayMessage('You already guessed that letter! Guess again.');
        setPlayerGuess('');
        return;
      }
    }
    let newWord = displayedWord.map((letter, i) => {
      if (chosenWord[i] === playerGuess) {
        matchFound = true;
        return playerGuess;
        //inputs the letter into displayedWord
      }
      return letter;
      //leaves the letter as it was (so '-')
    });
    if (matchFound) {
      playerGuessRecord = [...playerGuessRecord, playerGuess];
      setDisplayMessage('Well done, Einstein! Guess another letter.');
    } else {
      playerGuessRecord = [...playerGuessRecord, playerGuess];
      setDisplayHangman(displayHangman + 1);
      setDisplayMessage(`Nope, that's not one of the letters. Try again.`);
    }
    setDisplayedWord(newWord);
    setPlayerGuess('');
    if (newWord.join('') === chosenWord.join('')) {
      setGameResultMessage(
        `Well done you! You've saved the code in the nick of time. Click play again below to have another go!`
      );
      setDisplayMessage('');
      setGameFinished(true);
    }
  }

  function restartGame() {
    setChosenWord(wordBank[Math.floor(Math.random() * 10)]);
    console.log('game reset');
    console.log(chosenWord);
    setDisplayedWord(['-', '-', '-', '-', '-']);
    setDisplayMessage('');
    setDisplayHangman(0);
    setGameResultMessage('');
    setGameFinished(false);
    playerGuessRecord = [];
  }

  return (
    <div>
      <img src={noose} alt="noose" className="nooseImg" />
      <h1>HangCode</h1>
      <h3>Can you guess the word before you hang the code?</h3>
      {gameResultMessage && <Message message={gameResultMessage} />}
      <Message message={displayMessage} />
      <Hangman
        displayHangman={displayHangman}
        setDisplayMessage={setDisplayMessage}
        setGameFinished={setGameFinished}
      />

      <PlayGame
        setPlayerGuess={setPlayerGuess}
        displayWord={displayedWord}
        playerGuess={playerGuess}
        checkGuess={checkGuess}
        restartGame={restartGame}
        gameFinished={gameFinished}
      />
    </div>
  );
}
export default App;
