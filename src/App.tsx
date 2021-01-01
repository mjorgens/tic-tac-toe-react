import React, { useState } from 'react';
import './App.scss';
import GameBoard from './components/GameBoard';

function App() {
    const [gameId, setGameId] = useState<number>(1);

    const resetGame = (): void => {
        setGameId(gameId + 1);
    };

    return (
        <div className="container">
            <GameBoard key={gameId} resetGame={resetGame} />
        </div>
    );
}

export default App;
