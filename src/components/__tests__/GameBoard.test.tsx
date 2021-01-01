import React from 'react';
import GameBoard, { Props } from '../GameBoard';
import { render, fireEvent, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

const renderGameBoard = (props: Partial<Props> = {}) => {
    const defaultProps: Props = {
        resetGame() {
            return;
        },
    };

    return render(<GameBoard {...defaultProps} {...props} />);
};

jest.useFakeTimers();

describe('<GameBoard />', () => {
    describe('squares', () => {
        test('should have 9 squares', () => {
            renderGameBoard();
            const boxes = screen.getAllByRole('button');

            expect(boxes).toHaveLength(9);
        });

        test('should update with player when square is clicked', () => {
            renderGameBoard();
            const boxes = screen.getAllByRole('button');

            fireEvent.click(boxes[0]);

            expect(boxes[0]).toHaveTextContent('X');
        });

        test('should be disabled when square is clicked', () => {
            renderGameBoard();
            const boxes = screen.getAllByRole('button');

            fireEvent.click(boxes[0]);

            expect(boxes[0]).toBeDisabled();
        });

        test('should alternate between players when square is clicked', () => {
            renderGameBoard();
            const boxes = screen.getAllByRole('button');

            act(() => {
                fireEvent.click(boxes[0]);
                jest.runAllTimers();
            });

            expect(boxes[0]).toHaveTextContent('X');
            expect(boxes[4]).toHaveTextContent('O');
        });

        test('all square should be disabled when there is a winner', () => {
            renderGameBoard();
            const boxes = screen.getAllByRole('button');

            for (let i = 0; i < 7; i++) {
                fireEvent.click(boxes[i]);
            }

            for (const i in boxes) {
                expect(boxes[i]).toBeDisabled();
            }
        });
    });

    describe('heading tests', () => {
        test('heading should contain "Current Player:" when no winner', () => {
            renderGameBoard();
            const heading = screen.getByRole('heading');

            expect(heading.textContent).toContain('Current Player:');
        });

        test('heading should contain "Winner is" when there is a win', () => {
            renderGameBoard();
            const boxes = screen.getAllByRole('button');
            const heading = screen.getByRole('heading');

            for (let i = 0; i < 7; i++) {
                fireEvent.click(boxes[i]);
            }

            expect(heading.textContent).toContain('Winner is');
        });
    });

    describe('play again button', () => {
        test('play again button is not visible when no winner', () => {
            renderGameBoard();

            expect(screen.queryByRole('button', { name: /Play Again/i })).not.toBeInTheDocument();
        });

        test('play again button is visible when there is a win', () => {
            renderGameBoard();
            const boxes = screen.getAllByRole('button');

            for (let i = 0; i < 7; i++) {
                fireEvent.click(boxes[i]);
            }

            expect(screen.getByRole('button', { name: /Play Again/i })).toBeInTheDocument();
        });

        test('resetGame is called when play again button is clicked', () => {
            const resetGame = jest.fn();
            renderGameBoard({ resetGame });
            const boxes = screen.getAllByRole('button');

            for (let i = 0; i < 7; i++) {
                fireEvent.click(boxes[i]);
            }

            fireEvent.click(screen.getByRole('button', { name: /Play Again/i }));

            expect(resetGame).toBeCalled();
        });
    });
});
