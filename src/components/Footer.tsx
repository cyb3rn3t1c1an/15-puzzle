import ResetButton from "./ResetButton.tsx";
import Moves from "./Moves.tsx";
import {CSSProperties, MouseEventHandler} from "react";

interface Props {
    count: number;
    newGameHandler: MouseEventHandler;
    isSolved: boolean;
}

export default function Footer({count, newGameHandler, isSolved}: Props) {

    const style: CSSProperties = {
        display: 'flex',
        justifyContent: 'space-between'
    }

    return (<div style={style}>
        <ResetButton isSolved={isSolved} handler={newGameHandler}/>
        <Moves count={count}/>
    </div>);
}