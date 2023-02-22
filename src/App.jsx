import React, { useState, useEffect } from 'react';
import Card from './components/Card';
import Header from './components/Header';
import useAppBadge from './hooks/useAppBadge';
import shuffle from './utilities/shuffle';

function App() {
  const [wins, setWins] = useState(0); // Win streak
  const [cards, setCards] = useState(shuffle); // Cards array from assets
  const [pickOne, setPickOne] = useState(null); // First selection
  const [pickTwo, setPickTwo] = useState(null); // Second selection
  const [disabled, setDisabled] = useState(false); // Delay handler
  const [setBadge, clearBadge] = useAppBadge(); // Handles app badge
  const [tries, setTries] = useState(cards.length); //tries left to win the current game
  const [gameOver, setGameOver] = useState(false);

  // Handle card selection
  const handleClick = (card) => {
    if (!disabled) {
      pickOne ? setPickTwo(card) : setPickOne(card);
    }
  };

  const handleTurn = () => {
    setPickOne(null);
    setPickTwo(null);
    setDisabled(false);
  };

  // Start over
  const handleNewGame = () => {
    setWins(0);
    clearBadge();
    handleTurn();
    setCards(shuffle);
    setTries(cards.length);
    setGameOver(false);
  };

  // Used for selection and match handling
  useEffect(() => {
    let pickTimer;

    // Two cards have been clicked
    if (pickOne && pickTwo) {
      // Check if the cards the same
      if (pickOne.image === pickTwo.image) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.image === pickOne.image) {
              // Update card property to reflect match
              return { ...card, matched: true };
            } else {
              // No match
              return card;
            }
          });
        });
        handleTurn();
      } else {
      
        // Prevent new selections until after delay
        setDisabled(true);
        // Add delay between selections
        pickTimer = setTimeout(() => {
          handleTurn();
          setTries(tries -1);
        }, 1000);
      }
    }

    return () => {
      clearTimeout(pickTimer);
    };
  }, [cards, pickOne, pickTwo, setBadge, tries]);


  // If player has found all matches, handle accordingly
  useEffect(() => {
    if(!gameOver){
    // Check for any remaining card matches
    const checkWin = cards.filter((card) => !card.matched);

    // All matches made, handle win/badge counters
    if (cards.length && checkWin.length < 1) {
      console.log('You win!');
      setWins(wins + 1);
      setBadge();
      handleTurn();
      setCards(shuffle);
      setTries(cards.length);
    }
  }
  }, [cards, setBadge, wins, gameOver]);

 //If you have run out of tries -- game over
 useEffect(() => {
    if(tries < 1){
      setGameOver(true);
      setCards((prevCards) => {
        return prevCards.map((card) => {
          return {...card, onClick: null}
        })
      })
    }
  }, [tries]);


  return (
    <>
      <Header handleNewGame={handleNewGame} wins={wins} tries = {tries} gameOver= {gameOver} />
      <div className="grid">
        {cards.map((card) => {
          // Destructured card properties
          const { image, matched } = card;

          return (
            <Card
              key={image.id}
              card={card}
              image={image}
              onClick={() => handleClick(card)}
              selected={card === pickOne || card === pickTwo || matched}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;