import CellModel, {Statuses} from "./CellModel.ts";

export default class GameModel {
    private readonly width = 4
    private readonly gridSize = Math.pow(this.width, 2);
    readonly board: CellModel[] = [];
    readonly movesCounter: number;

    /**
     * Generates a new random board if no arguments are passed,
     * otherwise just assigns passed cells and movesCounter
     * @param cells
     * @param movesCounter
     */
    constructor(cells: CellModel[] = [], movesCounter = 0) {
        this.board = cells;
        this.movesCounter = movesCounter;
        if (cells.length === 0) {
            for (let i = 0; i < this.gridSize; i++) {
                this.board[i] = new CellModel(i + 1, Statuses.FILLED);

                if (i == this.gridSize - 1) this.board[i] = new CellModel(16, Statuses.EMPTY);
            }
            this.shuffle();
            this.movesCounter = 0;
        }
    }

    copy(cells: CellModel[], movesCounter: number) {
        return new GameModel(cells, movesCounter);
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
            return {cells: this.board, moves: this.move(index, emptyCell)};
        }

        return {cells: this.board, moves: this.movesCounter};
    }

    private isEmptyCell(index: number) {
        return index == -1 ? false : this.board[index].status == Statuses.EMPTY;
    }

    private move(from: number, to: number): number {
        [this.board[from], this.board[to]] = [this.board[to], this.board[from]];

        return this.movesCounter + 1;
    }

    private isSolvable() {
        let inversions = 0;
        for (let i = 0; i < 15; i++) {
            for (let j = i + 1; j < 16; j++) {
                if (this.board[j] && this.board[i] && this.board[i] > this.board[j]) {
                    inversions++;
                }
            }
        }
        return inversions % 2 === 0;
    }

    // Used Fisher-Yates shuffle
    private shuffle() {
        let currentIndex = this.board.length;

        while (0 !== currentIndex) {
            const randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            this.move(currentIndex, randomIndex);
        }

        if (!this.isSolvable()) {
            this.shuffle();
        }
    }

    private findNeighbors(index: number) {
        const top = index < this.width ? -1 : index - this.width;
        const bottom = index + this.width >= this.gridSize ? -1 : index + this.width;
        const left = index % this.width === 0 ? -1 : index - 1;
        const right = (index + 1) % this.width === 0 ? -1 : index + 1;

        return [left, top, right, bottom];
    }

}