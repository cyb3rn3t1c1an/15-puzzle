export enum Statuses {
    FILLED,
    EMPTY
}
export default class CellModel {
    readonly value: number;
    readonly status: Statuses;

    constructor(value: number, status: Statuses) {
        this.value = value;
        this.status = status;
    }
}