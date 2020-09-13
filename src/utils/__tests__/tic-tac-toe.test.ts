import {Player} from "../../models/player";
import {bestMove, switchPlayer, tieCheck, winnerCheck} from "../tic-tac-toe";

describe('tie-tac-toe.ts', () => {
    describe('switchPlayer()', () => {
        test('should return X when given O', () => {
            expect(switchPlayer(Player.O)).toBe(Player.X);
        });

        test('should return O when given X', () => {
            expect(switchPlayer(Player.X)).toBe(Player.O);
        });
    });

    describe('tieCheck()', () => {
        test('should return true when board is full', () => {
            const board: Player[] = [Player.O, Player.X, Player.O,
                Player.X, Player.X, Player.O,
                Player.O, Player.O, Player.X];

            expect(tieCheck(board)).toBeTruthy();
        });

        test('should return false when board is not full', () => {
            const board: Player [] = Array(9);

            expect(tieCheck(board)).toBeFalsy();
        });
    });

    describe('winnerCheck()', () => {
        test('should return winner on vertical win', () => {
            const firstCol: Player [] = [Player.X, Player.O, Player.X,
                Player.X, Player.O, Player.O,
                Player.X, Player.X, Player.O];

            expect(winnerCheck(firstCol)).toBe(Player.X);

            const secondCol: Player [] = [Player.O, Player.X, Player.O,
                Player.O, Player.X, Player.X,
                Player.X, Player.X, Player.O];

            expect(winnerCheck(secondCol)).toBe(Player.X);

            const thirdCol: Player [] = [Player.O, Player.O, Player.X,
                Player.O, Player.X, Player.X,
                Player.X, Player.O, Player.X];

            expect(winnerCheck(thirdCol)).toBe(Player.X);
        });

        test('should return winner on horizontal win', () => {
            const firstRow: Player [] = [Player.X, Player.X, Player.X,
                Player.X, Player.O, Player.O,
                Player.O, Player.O, Player.X];

            expect(winnerCheck(firstRow)).toBe(Player.X);

            const secondRow: Player [] = [Player.X, Player.O, Player.O,
                Player.X, Player.X, Player.X,
                Player.O, Player.O, Player.X];

            expect(winnerCheck(secondRow)).toBe(Player.X);

            const thirdRow: Player [] = [Player.X, Player.O, Player.O,
                Player.O, Player.O, Player.X,
                Player.X, Player.X, Player.X];

            expect(winnerCheck(thirdRow)).toBe(Player.X);
        });

        test('should return winner on diagonal win', () => {
            const leftToRight: Player [] = [Player.X, Player.X, Player.O,
                Player.O, Player.X, Player.X,
                Player.O, Player.O, Player.X];

            expect(winnerCheck(leftToRight)).toBe(Player.X);

            const rightToLeft: Player [] = [Player.O, Player.O, Player.X,
                Player.X, Player.X, Player.O,
                Player.X, Player.O, Player.X];

            expect(winnerCheck(rightToLeft)).toBe(Player.X);
        });

        test('should return cat when board is tie', () => {
            const board: Player[] = [Player.O, Player.X, Player.O,
                Player.X, Player.X, Player.O,
                Player.O, Player.O, Player.X];

            expect(winnerCheck(board)).toBe(Player.Cat);
        });

        test('should return undefined when board is not full and no win', () => {
            const board: Player [] = Array(9).fill(undefined);

            expect(winnerCheck(board)).toBeUndefined();
        });
    });
    describe('bestMove()', () => {
        test('should block player from winning', () => {
            /* [Player.O, Player.X, undefined,
                Player.X, Player.X, Player.O,
                Player.X, Player.O, undefined];*/
            const board2: Player[] = Array(9).fill(undefined);
            board2[0] = Player.O;
            board2[1] = Player.X;
            board2[3] = Player.X;
            board2[4] = Player.X;
            board2[5] = Player.O;
            board2[6] = Player.X;
            board2[7] = Player.O;

            expect(bestMove(board2, Player.O)).toBe(2);

            /* [Player.O, Player.X, Player.X,
               Player.X, Player.X, Player.O,
               undefined, Player.O, undefined];*/
            const board6: Player[] = Array(9).fill(undefined);
            board6[0] = Player.O;
            board6[1] = Player.X;
            board6[2] = Player.X;
            board6[3] = Player.X;
            board6[4] = Player.X;
            board6[5] = Player.O;
            board6[7] = Player.O;

            expect(bestMove(board6, Player.O)).toBe(6);

            /* [Player.O, Player.X, undefined,
               Player.X, Player.X, undefined,
               undefined, Player.O, undefined];*/
            const board5: Player[] = Array(9).fill(undefined);
            board5[0] = Player.O;
            board5[1] = Player.X;
            board5[3] = Player.X;
            board5[4] = Player.X;
            board5[7] = Player.O;

            expect(bestMove(board5, Player.O)).toBe(5);
        });

        test('should pick winning move', () => {
            /* [Player.O, Player.X, undefined,
                Player.X, Player.O, Player.X,
                Player.X, Player.O, undefined];*/
            const board8: Player[] = Array(9).fill(undefined);
            board8[0] = Player.O;
            board8[1] = Player.X;
            board8[3] = Player.X;
            board8[4] = Player.O;
            board8[5] = Player.X;
            board8[6] = Player.X;
            board8[7] = Player.O;

            expect(bestMove(board8, Player.O)).toBe(8);

            /* [Player.O, Player.X, Player.X,
               Player.O, Player.X, Player.X,
               undefined, Player.O, undefined];*/
            const board6: Player[] = Array(9).fill(undefined);
            board6[0] = Player.O;
            board6[1] = Player.X;
            board6[2] = Player.X;
            board6[3] = Player.O;
            board6[4] = Player.X;
            board6[5] = Player.X;
            board6[7] = Player.O;

            expect(bestMove(board6, Player.O)).toBe(6);
        });
    });
});
