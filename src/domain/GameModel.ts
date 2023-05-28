import CellModel, {Statuses} from "./CellModel.ts";

export default class GameModel {
    private readonly width = 4
    private readonly gridSize = Math.pow(this.width, 2);
    board: CellModel[] = [];
    movesCounter = 0;

    constructor(cells: CellModel[] = [], movesCounter = 0, updated = false) {
        this.board = cells;
        this.movesCounter = movesCounter;
        if (!updated) {
            for (let i = 0; i < this.gridSize; i++) {
                this.board[i] = new CellModel(i + 1, Statuses.FILLED);

                if (i == this.gridSize - 1) this.board[i] = new CellModel(16, Statuses.EMPTY);
            }
            this.shuffle();
            this.movesCounter = 0;
        }
    }

    copy(cells: CellModel[], movesCounter: number) {
        return new GameModel(cells, movesCounter, true);
    }

    isSolved() {
        return this.board.every((cell, index, array) =>
            index === 0 || array[index - 1].value <= cell.value
        );
    }

    attemptToMove(index: number) {
        const neighbors = this.findNeighbors(index);
        if (neighbors.left != null && this.isEmptyCell(neighbors.left)) {
            this.move(index, neighbors.left);
        } else if (neighbors.top != null && this.isEmptyCell(neighbors.top)) {
            this.move(index, neighbors.top);
        } else if (neighbors.right != null && this.isEmptyCell(neighbors.right)) {
            this.move(index, neighbors.right);
        } else if (neighbors.bottom != null && this.isEmptyCell(neighbors.bottom)) {
            this.move(index, neighbors.bottom);
        }

        return {cells: this.board, moves: this.movesCounter};
    }

    private isEmptyCell(index: number) {
        return this.board[index].status == Statuses.EMPTY
    }

    private move(from: number, to: number) {
        [this.board[from], this.board[to]] = [this.board[to], this.board[from]];
        this.movesCounter++;
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
        const top = index < this.width ? null : index - this.width;
        const bottom = index + this.width >= this.gridSize ? null : index + this.width;
        const left = index % this.width === 0 ? null : index - 1;
        const right = (index + 1) % this.width === 0 ? null : index + 1;

        return {left, top, right, bottom};
    }

}