import Board from "./Board.tsx";
import Footer from "./Footer.tsx";
import {useState} from "react";
import GameModel from "../domain/GameModel.ts";

export default function Game() {
    const [game, setGame] = useState(new GameModel());

    function newGame() {
        setGame(new GameModel());
    }

    function tick(index: number) {
        const {cells, moves} = game.attemptToMove(index);
        if (game.movesCounter < moves) {
            setGame(game.copy(cells, moves));
        }
    }

    return (
        <div>
            <Board tick={tick} board={game.board} isSolved={game.isSolved()}/>
            <Footer isSolved={game.isSolved()} count={game.movesCounter} newGameHandler={newGame}/>
        </div>
    )
}