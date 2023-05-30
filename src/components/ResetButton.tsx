import {BaseSyntheticEvent, CSSProperties} from "react";
import {useRecoilValue, useResetRecoilState} from "recoil";
import {isSolvedState, resetGameState} from "../recoil/State.ts";

export default function ResetButton() {

    const isSolved = useRecoilValue(isSolvedState);
    const reset = useResetRecoilState(resetGameState);

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
                   onClick={reset}>{label}</button>
}