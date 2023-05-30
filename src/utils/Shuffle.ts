import CellModel from "../domain/CellModel.ts";

/**
 * Found Fisher-Yates shuffle algorithm, not sure if it actually works
 */
export function shuffle(board: CellModel[]): CellModel[] {
    let currentIndex = board.length;

    while (0 !== currentIndex) {
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        [board[currentIndex], board[randomIndex]] = [board[randomIndex], board[currentIndex]];
    }

    if (!isSolvable(board)) {
        return shuffle(board);
    }

    return board;

}

function isSolvable(board: CellModel[]) {
    let inversions = 0;
    for (let i = 0; i < 15; i++) {
        for (let j = i + 1; j < 16; j++) {
            if (board[j] && board[i] && board[i] > board[j]) {
                inversions++;
            }
        }
    }
    return inversions % 2 === 0;
}


