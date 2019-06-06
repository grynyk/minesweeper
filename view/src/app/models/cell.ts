export class Cell {
    checked: boolean;
    marked?: number;
    hasBomb: boolean;
    neighbors: number;
    constructor(hasBomb: boolean) {
        this.hasBomb = hasBomb;
        this.checked = false;
        this.neighbors = 0;
    }
}
