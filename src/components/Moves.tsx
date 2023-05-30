import {CSSProperties} from "react";
import {useRecoilValue} from "recoil";

import {movesCounterState} from "../recoil/State.ts";

export default function Moves() {

    const movesCount = useRecoilValue(movesCounterState);

    const style: CSSProperties = {
        paddingTop: '0.1vw',
        paddingRight: '0.4vw',
        fontSize: '1.2vw'
    }

    return <div style={style}>Moves: {movesCount}</div>
}