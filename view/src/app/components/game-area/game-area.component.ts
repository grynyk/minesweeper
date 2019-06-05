import { Component, Input } from '@angular/core';
import { GameService } from "../../services/game.service";
import { MatDialog } from '@angular/material';
import { NotificationDialogComponent } from '../modals/notification-dialog/notification-dialog.component';
import { RecordsService } from 'src/app/services/records.service';
import { Record } from 'src/app/models/record';
import { UsersService } from 'src/app/services/users.service';

@Component({
	selector: 'app-game-area',
	templateUrl: './game-area.component.html',
	styleUrls: ['./game-area.component.css']
})
export class GameAreaComponent {
	@Input() x: number;
	@Input() y: number;

	@Input() checked: boolean;
	@Input() marked: number;
	@Input() hasBomb: boolean;
	@Input() neighbors: number;
	@Input() showBombs: boolean = false;
	@Input() bombMode:boolean = false;

	cellFlag:string;
	displayCellFlag:boolean = false;
	constructor(public gameService: GameService, 
		private recordService: RecordsService,
		private userService: UsersService,
		public dialog: MatDialog) { }

	markCell(x, y) {
		if(!this.gameService.area[y][x].marked) {
			this.gameService.area[y][x].marked = 1;
		} else if(this.gameService.area[y][x].marked === 1) {
			this.gameService.area[y][x].marked = 2;
		} else if(this.gameService.area[y][x].marked === 2) {
			this.gameService.area[y][x].marked = null;
		}

	}

	revealArea(x, y) {
		let record: Record;
		if (this.gameService.revealCell(x, y) === true) {
			this.dialog.open(NotificationDialogComponent, {
				width: '500px',
				data: { title: "YOU WON", message: "Game finished!" }
			});
			record = {
				win: true,
				dimensions: `${this.gameService.areaColumns} x ${this.gameService.areaRows}`,
				score: `${this.gameService.checkedCells} / ${this.gameService.cellsToCheck}`,
				mode:'normal'
			}
			this.recordService.createRecord(record).subscribe(res => {
				console.log(res);
			}, err => {
				this.dialog.open(NotificationDialogComponent, {
					width: '500px',
					data: { title: "Error", message: err.error }
				});
			});
		}

		if (this.gameService.revealCell(x, y) === false) {
			this.dialog.open(NotificationDialogComponent, {
				width: '500px',
				data: { title: "GAME OVER", message: "You stepped on a mine!" }
			});
			record = {
				win: false,
				dimensions: `${this.gameService.areaColumns} x ${this.gameService.areaRows}`,
				score: `${this.gameService.checkedCells} / ${this.gameService.cellsToCheck}`,
				mode:'normal'
			}
			this.recordService.createRecord(record).subscribe(res => {
				console.log(res);
			}, err => {
				this.dialog.open(NotificationDialogComponent, {
					width: '500px',
					data: { title: "Error", message: err.error }
				});
			});
			this.gameService.initializeArea();
		}
	}

	countBombs(x,y) {
		let record: Record;
		if (this.gameService.area[y][x].hasBomb) {
			this.gameService.area[y][x].checked = true;
			if (+this.gameService.bombsCount === +this.gameService.bombsModeCounter) {
				this.dialog.open(NotificationDialogComponent, {
					width: '500px',
					data: { title: "YOU WON", message: "Game finished!" }
				});
				record = {
					win: true,
					dimensions: `${this.gameService.areaColumns} x ${this.gameService.areaRows}`,
					score: `${this.gameService.checkedCells} / ${this.gameService.cellsToCheck}`,
					mode:'bomb'
				}
				this.recordService.createRecord(record).subscribe(res => {
					console.log(res);
				}, err => {
					this.dialog.open(NotificationDialogComponent, {
						width: '500px',
						data: { title: "Error", message: err.error }
					});
				});
			} else {
				this.gameService.bombsModeCounter+=1;
				console.log(this.gameService.bombsModeCounter)
			}
		} else {
			this.dialog.open(NotificationDialogComponent, {
				width: '500px',
				data: { title: "GAME OVER", message: "There's no bomb!" }
			});
			record = {
				win: false,
				dimensions: `${this.gameService.areaColumns} x ${this.gameService.areaRows}`,
				score: `${this.gameService.checkedCells} / ${this.gameService.cellsToCheck}`,
				mode:'bomb'
			}
			this.recordService.createRecord(record).subscribe(res => {
				console.log(res);
			}, err => {
				this.dialog.open(NotificationDialogComponent, {
					width: '500px',
					data: { title: "Error", message: err.error }
				});
			});
			this.gameService.initializeArea();
		}
	}
}
