import {CSSProperties} from "react";
import Cell from "./Cell.tsx";
import CellModel, {Statuses} from "../domain/CellModel.ts";

interface Props {
    board: CellModel[];
    tick: (index: number) => void
    isSolved: boolean
}

export default function Board({tick, board, isSolved}: Props) {

    const style: CSSProperties = {
        width: 'calc(6.4vw * 4)',
        height: 'calc(6.4vw * 4)',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.4vw',
        pointerEvents: isSolved ? 'none' : 'auto'
    }

    function handleClick(index: number) {
        tick(index);
    }

    const cells = board.map((cell, index) =>
        <Cell key={index} value={cell.value} index={index} handleClick={() => handleClick(index)}
              isFilled={cell.status == Statuses.FILLED}/>
    );

    return (<div style={style}>{cells}</div>);
}