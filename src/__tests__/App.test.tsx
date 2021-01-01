import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';

describe('<App />', () => {
    test('should be rendered', () => {
        render(<App />);

        expect(screen.getByRole('heading').textContent).toContain('Current Player:');
    });

    test('game is reset when play again button is clicked', () => {
        render(<App />);
        const boxes = screen.getAllByRole('button');

        for (let i = 0; i < 7; i++) {
            fireEvent.click(boxes[i]);
        }

        expect(screen.getByRole('heading').textContent).toContain('Winner is ');

        fireEvent.click(screen.getByRole('button', { name: /Play Again/i }));

        expect(screen.getByRole('heading').textContent).toContain('Current Player:');
    });
});
