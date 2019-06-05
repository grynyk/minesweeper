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
	@Input() hasBomb: boolean;
	@Input() neighbors: number;
	@Input() showBombs: boolean = false;

	constructor(public game: GameService, 
		private recordService: RecordsService,
		private userService: UsersService,
		public dialog: MatDialog) { }

	revealGame(x, y) {
		let record: Record;
		if (this.game.reveal(x, y) === true) {
			this.dialog.open(NotificationDialogComponent, {
				width: '500px',
				data: { title: "YOU WON", message: "Game finished!", button: 'CLOSE' }
			});
			record = {
				win: true,
				dimensions: `${this.x}x${this.y}`,
				checked: this.game.checked
			}
			this.recordService.createRecord(record).subscribe(res => {
				console.log(res);
			})
		}

		if (this.game.reveal(x, y) === false) {
			this.dialog.open(NotificationDialogComponent, {
				width: '500px',
				data: { title: "GAME OVER", message: "You stepped on a mine!", button: 'CLOSE' }
			});
			record = {
				win: false,
				dimensions: `${this.x}x${this.y}`,
				checked: this.game.checked
			}
			this.recordService.createRecord(record).subscribe(res => {
				console.log(res);
			})
			this.game.initialize();
		}
	}

}
