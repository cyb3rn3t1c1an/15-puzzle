import {CSSProperties} from "react";
import Cell from "./Cell.tsx";
import {Statuses} from "../domain/CellModel.ts";
import {useRecoilState, useRecoilValue} from "recoil";
import {gameState, isSolvedState} from "../recoil/State.ts";
import GameModel from "../domain/GameModel.ts";

export default function Board() {

    const [game, setGame] = useRecoilState(gameState);
    const isSolved = useRecoilValue(isSolvedState);

    const style: CSSProperties = {
        width: 'calc(6.4vw * 4)',
        height: 'calc(6.4vw * 4)',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.4vw',
        pointerEvents: isSolved ? 'none' : 'auto'
    }

    function tick(index: number) {
        const attempt = game.attemptToMove(index);
        if (attempt) {
            setGame(new GameModel(attempt.board, attempt.moves));
        }
    }

    const cells = game.board.map((cell, index) =>
        <Cell key={cell.value} value={cell.value} index={index} handleClick={() => tick(index)}
              isFilled={cell.status == Statuses.FILLED}/>
    );

    return (<div style={style}>{cells}</div>);
}