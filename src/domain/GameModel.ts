import CellModel, {Statuses} from "./CellModel.ts";
import {shuffle} from "../utils/Shuffle.ts";

export default class GameModel {
    private readonly width = 4
    private readonly gridSize = Math.pow(this.width, 2);

    readonly board: CellModel[];
    readonly movesCounter: number;

    /**
     * Generates a new random board if no arguments are passed,
     * otherwise just assigns passed cells and movesCounter
     * @param board
     * @param movesCounter
     */
    constructor(board: CellModel[] = [], movesCounter = 0) {
        this.board = board;
        this.movesCounter = movesCounter;
        if (board.length === 0) {
            for (let i = 0; i < this.gridSize; i++) {
                this.board[i] = new CellModel(i + 1, Statuses.FILLED);

                if (i == this.gridSize - 1) this.board[i] = new CellModel(16, Statuses.EMPTY);
            }

            this.board = shuffle(this.board);
            this.movesCounter = 0;
        }
    }

    copy(board: CellModel[], movesCounter: number) {
        return new GameModel(board, movesCounter);
    }

    isSolved() {
        return this.board.every((cell, index, array) =>
            index === 0 || array[index - 1].value <= cell.value
        );
    }

    attemptToMove(index: number) {
        const neighbors = this.findNeighbors(index);
        const emptyCell = neighbors.find(index => this.isEmptyCell(index));

        if (emptyCell !== undefined) {
            return {board: this.move(this.board, index, emptyCell), moves: this.movesCounter + 1};
        }

        return {board: this.board, moves: this.movesCounter};
    }

    private isEmptyCell(index: number) {
        return index == -1 ? false : this.board[index].status == Statuses.EMPTY;
    }

    private move(board: CellModel[], from: number, to: number) {
        return board.map((value, index) => {
            if (index === from) {
                return board[to];
            } else if (index === to) {
                return board[from];
            } else {
                return value;
            }
        });
    }

    private findNeighbors(index: number) {
        const top = index < this.width ? -1 : index - this.width;
        const bottom = index + this.width >= this.gridSize ? -1 : index + this.width;
        const left = index % this.width === 0 ? -1 : index - 1;
        const right = (index + 1) % this.width === 0 ? -1 : index + 1;

        return [left, top, right, bottom];
    }

}