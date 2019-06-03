import { Injectable } from '@angular/core';
import { Box } from "../models/box";

@Injectable()
export class GameService {

	public xCount: number = 10;
	public yCount: number = 10;
	public bombsNumber: number = 10;
	public area: Box[][];

	constructor() {
		this.initialize();
	}


	public reveal(x: number, y: number) {
		if (this.area[y][x].hasBomb) {
			alert("You stepped on a mine, game over!");
			this.initialize();
		}
		else {
			this.area[y][x].checked = true;
			this.automaticallyCheckNeighbors(x, y);
			if (this.leftToBeChecked === 0) { alert("You won!"); }
		}
	}

	private initialize() {
		this.area = [];
		let counter = 0;
		let rb;
		for (let y = 0; y < this.yCount; y++) {
			this.area[y] = [];
			for (let x = 0; x < this.xCount; x++) {
				rb = this.randomBool();
				if(rb) {
					counter++;
				}
				if(counter > this.bombsNumber) {
					rb = false;
				}
				console.log(counter);
				this.area[y][x] = new Box(rb);
				this.area[y][x].neighbors = 0;
			}
		}

		for (let y = 0; y < this.yCount; y++) {
			for (let x = 0; x < this.xCount; x++) {
				this.area[y][x].neighbors = this.countNeighbors(x, y);
			}
		}
	}

	private randomBool(): boolean {
		return Math.random() > 0.9;
	}

	private countNeighbors(x: number, y: number): number {
		return this.getValidNeighbors(x, y)
			.map(arr => this.area[arr[1]][arr[0]])
			.filter(box => box.hasBomb)
			.length;
	}

	private getValidNeighbors(x: number, y: number): number[][] {
		const result: number[][] = [];
		if (this.area[y][x - 1]) { result.push([x - 1, y]); }
		if (this.area[y][x + 1]) { result.push([x + 1, y]); }

		if (this.area[y - 1]) {
			if (this.area[y - 1][x]) { result.push([x, y - 1]); }
			if (this.area[y - 1][x + 1]) { result.push([x + 1, y - 1]); }
			if (this.area[y - 1][x - 1]) { result.push([x - 1, y - 1]); }
		}

		if (this.area[y + 1]) {
			if (this.area[y + 1][x]) { result.push([x, y + 1]); }
			if (this.area[y + 1][x + 1]) { result.push([x + 1, y + 1]); }
			if (this.area[y + 1][x - 1]) { result.push([x - 1, y + 1]); }
		}
		return result;
	}

	private automaticallyCheckNeighbors(x: number, y: number): void {
		this.getValidNeighbors(x, y).filter(cords => !this.area[cords[1]][cords[0]].hasBomb)
			.forEach(cords => {
				this.area[cords[1]][cords[0]].checked = true;
			});
	}

	get checked(): number {
		return this.area.map(ySet => ySet.filter(box => box.checked).length).reduce((total, next) => total + next, 0);
	}

	get shouldBeChecked(): number {
		return this.area.map(ySet => ySet.filter(box => !box.hasBomb).length).reduce((total, next) => total + next, 0);
	}

	get leftToBeChecked(): number {
		return this.shouldBeChecked - this.checked;
	}

	get bombsCount(): number {
		return (this.yCount * this.xCount) - this.shouldBeChecked;
	}
}
