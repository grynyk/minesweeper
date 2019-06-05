export class Cell {
	checked: boolean;
	hasBomb: boolean;
	neighbors: number;
	constructor (hasBomb: boolean) {
		this.hasBomb = hasBomb;
		this.checked = false;
		this.neighbors = 0;
	}
}