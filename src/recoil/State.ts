import {atom, selector} from "recoil";
import GameModel from "../domain/GameModel.ts";

export const gameState = atom({
    key: 'gameState',
    /*
    TODO: it looks like Recoil instantiates this default value on startup and
    reuses it. This behaviour causes a bug - the board is always the same after reset.
    Tried to handle it using resetGameState selector.
     */
    default: new GameModel()
});
export const isSolvedState = selector({
    key: 'isSolvedSate',
    get: ({get}) => {
        return get(gameState).isSolved();
    }
});
export const movesCounterState = selector({
    key: 'movesCounterState',
    get: ({get}) => {
        return get(gameState).movesCounter;
    }
});
export const resetGameState = selector({
    key: 'resetGameState',
    get: ({get}) => get(gameState),
    set: ({set}) => set(gameState, new GameModel())
});