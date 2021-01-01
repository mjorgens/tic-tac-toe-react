import React, { useEffect, useState } from 'react';
import { Player } from '../models/player';
import { bestMove, switchPlayer, winnerCheck } from '../utils/tic-tac-toe';
import Box from './Box';
import './GameBoard.scss';

export type Props = {
    resetGame(): void;
};

const GameBoard = (props: Props) => {
    const [board, setBoard] = useState<Player[]>(Array(9).fill(undefined));
    const [winner, setWinner] = useState<Player>();
    const [currentPlayer, setCurrentPlayer] = useState<Player>(Player.X);

    useEffect(() => {
        const winner = winnerCheck(board);
        setWinner(winner);

        let timer: NodeJS.Timeout;
        if (!winner && currentPlayer === Player.O) {
            timer = setTimeout(() => {
                computerTurn();
            }, 100);
        }
        return () => clearTimeout(timer);
    }, [board, currentPlayer]); // eslint-disable-line

    const turn = (id: number, marker: Player): void => {
        setBoard((board) =>
            board.map(
                (item: Player, index: number): Player => {
                    return index === id ? marker : item;
                }
            )
        );
    };

    const playerTurn = (id: number): void => {
        turn(id, currentPlayer);
        setCurrentPlayer(switchPlayer(currentPlayer));
    };

    const computerTurn = (): void => {
        turn(bestMove(board, currentPlayer), currentPlayer);
        setCurrentPlayer(switchPlayer(currentPlayer));
    };

    return (
        <>
            <div className="chalkboard">
                {winner !== undefined ? (
                    <h1 className="text-center">Winner is {Player[winner]}</h1>
                ) : (
                    <h1 className="text-center">Current Player: {Player[currentPlayer]}</h1>
                )}
                <div className="row row-cols-3 col-7 ml-auto mr-auto p-2">
                    {board.map((e: Player, i: number) => (
                        <Box key={i} id={i} player={e} hasWinner={winner !== undefined} handleClick={playerTurn} />
                    ))}
                </div>
            </div>
            <div className="row justify-content-center mt-2">
                {winner !== undefined && (
                    <button className="btn btn-primary" onClick={props.resetGame}>
                        Play Again
                    </button>
                )}
            </div>
        </>
    );
};

export default GameBoard;
