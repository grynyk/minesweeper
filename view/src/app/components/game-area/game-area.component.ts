import { Component, Input } from '@angular/core';
import { GameService } from '../../services/game.service';
import { MatDialog } from '@angular/material';
import { NotificationDialogComponent } from '../modals/notification-dialog/notification-dialog.component';
import { RecordsService } from 'src/app/services/records.service';
import { Record } from 'src/app/models/record';

@Component({
  selector: 'app-game-area',
  templateUrl: './game-area.component.html',
  styleUrls: [ './game-area.component.css' ]
})
export class GameAreaComponent {
  @Input() x: number;
  @Input() y: number;

  @Input() checked: boolean;
  @Input() marked: number;
  @Input() hasBomb: boolean;
  @Input() neighbors: number;
  @Input() showBombs = false;

  constructor(
    public gameService: GameService,
    private recordService: RecordsService,
    public dialog: MatDialog
  ) {}

  markCell(x: number, y: number) {
    if (!this.gameService.area[y][x].marked) {
      this.gameService.area[y][x].marked = 1;
    } else if (this.gameService.area[y][x].marked === 1) {
      this.gameService.area[y][x].marked = 2;
      this.countBombs(x, y);
    } else if (this.gameService.area[y][x].marked === 2) {
      this.gameService.bombsModeCounter = 1;
      this.gameService.area[y][x].marked = null;
    }
  }

  revealArea(x: number, y: number) {
    let record: Record;
    if (this.gameService.revealCell(x, y) === true) {
      this.dialog.open(NotificationDialogComponent, {
        width: '500px',
        data: { title: 'YOU ARE THE WINNER', message: 'ALL THE SAFE BLOCKS ARE OPENED' }
      });
      record = {
        win: true,
        dimensions: `${this.gameService.areaColumns} x ${this.gameService.areaRows}`,
        score: `${this.gameService.checkedCells} / ${this.gameService.cellsToCheck}`,
        mode: 'normal'
      };
      this.recordService.createRecord(record).subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          this.dialog.open(NotificationDialogComponent, {
            width: '500px',
            data: { title: 'Error', message: err.error }
          });
        }
      );
    }

    if (this.gameService.revealCell(x, y) === false) {
      this.dialog.open(NotificationDialogComponent, {
        width: '500px',
        data: { title: 'GAME OVER !', message: 'YOU STEPPED ON MINE !' }
      });
      record = {
        win: false,
        dimensions: `${this.gameService.areaColumns} x ${this.gameService.areaRows}`,
        score: `${this.gameService.checkedCells} / ${this.gameService.cellsToCheck}`,
        mode: 'normal'
      };
      this.recordService.createRecord(record).subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          this.dialog.open(NotificationDialogComponent, {
            width: '500px',
            data: { title: 'Error', message: err.error }
          });
        }
      );
      this.gameService.bombsModeCounter = 1;
      this.gameService.initializeArea();
    }
  }

  countBombs(x: number, y: number) {
    let record: Record;
    if (this.gameService.area[y][x].hasBomb) {
      if (+this.gameService.bombsCount === +this.gameService.bombsModeCounter) {
        this.gameService.bombsModeCounter = 1;
        this.dialog.open(NotificationDialogComponent, {
          width: '500px',
          data: { title: 'YOU ARE THE WINNER', message: 'ALL THE SAFE BLOCKS ARE OPENED' }
        });

        record = {
          win: true,
          dimensions: `${this.gameService.areaColumns} x ${this.gameService.areaRows}`,
          score: `${this.gameService.checkedCells} / ${this.gameService.cellsToCheck}`,
          mode: 'bomb'
        };

        this.recordService.createRecord(record).subscribe(
          (res) => {
            console.log(res);
          },
          (err) => {
            this.dialog.open(NotificationDialogComponent, {
              width: '500px',
              data: { title: 'Error', message: err.error }
            });
          }
        );
      } else {
        this.gameService.bombsModeCounter += 1;
      }
    }
  }
}
