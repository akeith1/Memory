import React, {useEffect} from 'react';

const Header = ({handleNewGame, wins, tries, gameOver}) => {
    useEffect(() => {document.title = gameOver ? 'Game Over!' : `${wins} wins`}, [wins, gameOver]);

    return (

        <header className="header">
        { gameOver ? <h3>Game Over</h3> : 
            <>
            <h4>{wins} wins</h4> <h4>{tries} tries left</h4><h3> Memory Game</h3></>
            }
            
            <button onClick={handleNewGame}>New Game</button>

        </header>
    );
}


export default Header;
