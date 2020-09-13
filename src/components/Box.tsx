import React from 'react';
import {Player} from '../models/player';
import './Box.scss';

export type Props = {
    id: number;
    player: Player | undefined;
    hasWinner: boolean;
    handleClick(id: number): void;
};

function Box(props: Props) {
    function handleOnClick(): void {
        props.handleClick(props.id)
    }

    return (
        <button className="box col" id={props.id.toString()} onClick={handleOnClick}
                disabled={props.player !== undefined || props.hasWinner}>
            {(props.player !== undefined) ? Player[props.player] : ""}
        </button>
    );
}

export default Box;
