import { Injectable } from '@angular/core';
import { Box } from "../models/box";
import { throwError } from 'rxjs';

@Injectable()
export class GameService {

	public xCount: number = 0;
	public yCount: number = 0;
	public bombsCount: number = 0;
	public area: Box[][];
	randomNumbers = [];

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
		this.randomNumbers = [];
		try {
			if ((this.xCount > 1 && this.yCount > 1) && (this.xCount <= 10 && this.yCount <= 10)) {
				if(this.bombsCount <= (this.yCount * this.xCount) - this.shouldBeChecked) {
					for (let y = 0; y < this.yCount; y++) {
						this.area[y] = [];
						for (let x = 0; x < this.xCount; x++) {
							this.area[y][x] = new Box(false);
							this.area[y][x].neighbors = 0;
						}
					}

					for (let i = 0; i < this.bombsCount; i++) {
						const rand1 = Math.floor(Math.random() * this.area.length);
						const rand2 = Math.floor(Math.random() * this.area.length);
						this.fillWithBombs(rand1, rand2)
					}

					for (let y = 0; y < this.yCount; y++) {
						for (let x = 0; x < this.xCount; x++) {
							this.area[y][x].neighbors = this.countNeighbors(x, y);
						}
					}
					
				} else {
					throwError("ERROR! Too much bombs for your gameboard")
				}
				
			} else {
				throwError("ERROR! Gameboard should be at least 2x2 and at most 10x10")
			}
		  }
		  catch(e) {
			console.log(e);
		  }


	}

	private fillWithBombs(rand1, rand2) {
		if (JSON.stringify(this.randomNumbers).indexOf(JSON.stringify([rand1, rand2])) === -1) {
			this.randomNumbers.push([rand1, rand2]);
			return this.area[rand1][rand2] = new Box(true);;
		} else {
			this.fillWithBombs(Math.floor(Math.random() * this.area.length), Math.floor(Math.random() * this.area.length))
		}
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

	// get bombsCount(): number {
	// 	return (this.yCount * this.xCount) - this.shouldBeChecked;
	// }
}
