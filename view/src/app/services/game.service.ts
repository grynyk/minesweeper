import { Injectable, EventEmitter } from '@angular/core';
import { Cell } from "../models/cell";
import { MatDialog } from '@angular/material';
import { NotificationDialogComponent } from '../components/modals/notification-dialog/notification-dialog.component';
import { RecordsService } from './records.service';
import { Record } from '../models/record';



@Injectable()
export class GameService {

	public areaColumns: number = 10;
	public areaRows: number = 10;
	public area: Cell[][];
	public bombsCount: number = 25;
	public bombsModeCounter: number = 1;
	randomNumbers = [];

	constructor(public dialog: MatDialog) {
		this.initializeArea();
	}

	gameEnded = new EventEmitter(false);
	public revealCell(x: number, y: number) {
		if (this.area[y][x].hasBomb) {
			this.gameEnded.emit(true);
			return false;
		}
		else {
			this.area[y][x].checked = true;
			this.revealNeighbors(x, y);
			if (this.cellsLeftToBeChecked === 0) {
				this.gameEnded.emit(true);
				return true;
			}
		}
	}

	public initializeArea() {
		this.area = [];
		this.randomNumbers = [];
		try {
			if ((this.areaColumns > 1 && this.areaRows > 1) && (this.areaColumns <= 10 && this.areaRows <= 10)) {
				if(this.bombsCount <= (this.areaRows * this.areaColumns) - this.cellsToCheck) {
					for (let y = 0; y < this.areaRows; y++) {
						this.area[y] = [];
						for (let x = 0; x < this.areaColumns; x++) {
							this.area[y][x] = new Cell(false);
							this.area[y][x].neighbors = 0;
						}
					}

					for (let i = 0; i < this.bombsCount; i++) {
						const rand1 = Math.floor(Math.random() * this.area.length);
						const rand2 = Math.floor(Math.random() * this.area.length);
						this.fillWithBombs(rand1, rand2)
					}

					for (let y = 0; y < this.areaRows; y++) {
						for (let x = 0; x < this.areaColumns; x++) {
							this.area[y][x].neighbors = this.countNeighborCells(x, y);
						}
					}
				} else {
					throw("Too much bombs for your gameboard");
				}
				
			} else {
				throw("Gameboard should be at least 2x2 and at most 10x10");
			}
		  }
		  catch(err) {
			const dialogRef = this.dialog.open(NotificationDialogComponent, {
				width: '500px',
				data: { title: "ERROR" , message: err, button:'CLOSE' }
			  });
		  }


	}

	private fillWithBombs(rand1, rand2) {
		if (JSON.stringify(this.randomNumbers).indexOf(JSON.stringify([rand1, rand2])) === -1) {
			this.randomNumbers.push([rand1, rand2]);
			return this.area[rand1][rand2] = new Cell(true);;
		} else {
			this.fillWithBombs(Math.floor(Math.random() * this.area.length), Math.floor(Math.random() * this.area.length))
		}
	}

	private countNeighborCells(x: number, y: number): number {
		return this.getValidNeighbors(x, y)
			.map(arr => this.area[arr[1]][arr[0]])
			.filter(cell => cell.hasBomb)
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

	private revealNeighbors(x: number, y: number): void {
		this.getValidNeighbors(x, y).filter(cords => !this.area[cords[1]][cords[0]].hasBomb)
			.forEach(cords => {
				this.area[cords[1]][cords[0]].checked = true;
			});
	}

	get checkedCells(): number {
		return this.area.map(ySet => ySet.filter(cell => cell.checked).length).reduce((total, next) => total + next, 0);
	}

	get cellsToCheck(): number {
		return this.area.map(ySet => ySet.filter(cell => !cell.hasBomb).length).reduce((total, next) => total + next, 0);
	}

	get cellsLeftToBeChecked(): number {
		return this.cellsToCheck - this.checkedCells;
	}
}
