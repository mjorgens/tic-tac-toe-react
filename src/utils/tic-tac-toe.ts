import {Player} from "../models/player";

/**
 * A function that check the board if there is a winner
 *
 * @param {Player[]} board - The board
 * @return {Player | undefined} The winner or undefined if no winner
 */
export function winnerCheck(board: Player[]): Player | undefined {
    // horizontal check
    for (let i = 0; i < board.length; i += 3) {
        if (board[i] === board[i + 1] && board[i + 1] === board[i + 2] && board[i] !== undefined) {
            return board[i];
        }
    }
    // vertical check
    for (let i = 0; i < 3; i++) {
        if (board[i] === board[i + 3] && board[i + 3] === board[i + 6] && board[i] !== undefined) {
            return board[i];
        }
    }
    // left->right check
    if (board[0] === board[4] && board[4] === board[8] && board[0] !== undefined) {
        return board[0];
    }
    // right->left check
    if (board[2] === board[4] && board[4] === board[6] && board[2] !== undefined) {
        return board[2];
    }
    // tie check
    if (tieCheck(board)) {
        return Player.Cat;
    }

    return undefined;
}

/**
 * A function that check a board if there is a tie or not
 *
 * @param {Player[]} board - The board
 * @return {boolean} If there is a tie or not
 */
export function tieCheck(board: Player[]): boolean {
    for (const e of board) {
        if (e === undefined) return false;
    }

    return true;
}

/**
 * A function that returns the best move from the board for the inputted player
 *
 * @param {Player[]} board - The current board
 * @param {Player} player - The player the find the move for
 * @return {number} The best move for the given player
 */
export function bestMove(board: Player[], player: Player): number {
    let bestScore = -Infinity;
    let bestMove = 0;
    // find the maximized score for computer and best move
    for (const i in board) {
        if (board[i] === undefined) {
            const copyBoard = [...board];
            copyBoard[i] = player;
            const score = minimax(copyBoard, player);

            if (score > bestScore) {
                bestScore = score;
                bestMove = parseInt(i);
            }
        }
    }

    return bestMove;
}

/**
 * Minimax function for tic tac toe
 *
 * @param {Player[]} board -The current board
 * @param {Player} player - The player to find the score for
 * @param {boolean} [playerMove=false] - Player move
 * @return {number} The best score for the current board
 */
export function minimax(board: Player[], player: Player, playerMove = false): number {
    const winner: Player | undefined = winnerCheck(board);

    // if opponent wins
    if (winner === switchPlayer(player)) {
        return -10;
    }
    // if player wins
    if (winner === player) {
        return 10;
    }
    // if tie
    if (winner === Player.Cat) {
        return 0;
    }

    let bestScore: number;
    if (playerMove) {
        bestScore = -Infinity;
        for (const i in board) {
            if (board[i] === undefined) {
                const copyBoard: Player[] = [...board];
                copyBoard[i] = player;
                const score: number = minimax(copyBoard, player, false);
                // find the maximized score
                if (score > bestScore) {
                    bestScore = score;
                }
            }
        }
    } else {
        bestScore = Infinity;
        for (const i in board) {
            if (board[i] === undefined) {
                const copyBoard: Player[] = [...board];
                copyBoard[i] = switchPlayer(player);
                const score: number = minimax(copyBoard, player, true);
                // find the minimized score
                if (score < bestScore) {
                    bestScore = score;
                }
            }
        }
    }

    return bestScore;
}


/**
 * Function to return the opposite player
 *
 * @param {Player} currentPlayer - the player to switch
 * @return {Player} the opposite player
 */
export function switchPlayer(currentPlayer: Player): Player {
    return (currentPlayer === Player.O) ? Player.X : Player.O;
}
