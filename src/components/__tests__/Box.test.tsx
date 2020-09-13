import React from 'react';
import Box, {Props} from '../Box';
import {Player} from '../../models/player';
import {render, fireEvent, screen} from '@testing-library/react';

function renderBox(props: Partial<Props> = {}) {
    const defaultProps: Props = {
        id: 0,
        player: undefined,
        hasWinner: false,
        handleClick() {
            return;
        }
    };

    return render(<Box {...defaultProps} {...props}/>);
}

describe('<Box />', () => {
    describe('button text should be same as player prop', () => {

        test('button text should be ""',  () => {
            renderBox();

            expect(screen.getByRole('button')).toHaveTextContent('');
        });

        test('button text should be O',  () => {
            renderBox({player: Player.O});

            expect(screen.getByRole('button')).toHaveTextContent('O');
        });

        test('button text should be X',  () => {
            renderBox({player: Player.X});

            expect(screen.getByRole('button')).toHaveTextContent('X');
        });
    });

    describe('testing disable functionality', () => {
        test('button should be not disabled if no player is set',  () => {
            renderBox();

            expect(screen.getByRole('button')).not.toBeDisabled();
        });

        test('button should be disabled if player is set',  () => {
            renderBox({player: Player.X});

            expect(screen.getByRole('button')).toBeDisabled();
        });
    });

    test('handleClick should be call when button is clicked',  () => {
        const handleClick = jest.fn();
        renderBox({handleClick});

        fireEvent.click(screen.getByRole('button'));

        expect(handleClick).toHaveBeenCalled();
    });
});
