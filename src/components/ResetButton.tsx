import {BaseSyntheticEvent, CSSProperties, MouseEventHandler} from "react";

interface Props {
    handler: MouseEventHandler;
    isSolved: boolean
}

export default function ResetButton({handler, isSolved}: Props) {

    const label = isSolved ? 'The puzzle is solved! Press to start a new game.' : 'New game';

    const style: CSSProperties = {
        width: '19vw',
        height: '3vw',
        background: '#335533',
        border: 'none',
        verticalAlign: 'center',
        textAlign: 'center',
        marginTop: '0.6vw',
        pointerEvents: 'all',
        fontSize: '1vw'
    }

    function handleOver(e: BaseSyntheticEvent) {
        e.target.style.cursor = 'pointer';
    }

    function handleLeave(e: BaseSyntheticEvent) {
        e.target.style.cursor = 'default';
    }

    return <button onMouseOver={handleOver}
                   onMouseLeave={handleLeave}
                   style={style}
                   onClick={handler}>{label}</button>
}