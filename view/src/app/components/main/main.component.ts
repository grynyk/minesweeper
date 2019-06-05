import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef, DoCheck } from '@angular/core';
import { MatDialog } from '@angular/material';
import { GameService } from '../../services/game.service';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';
import { Observable } from 'rxjs';
import { ContentDialogComponent } from '../modals/content-dialog/content-dialog.component';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  showBombsFlag: boolean = false;
  bombMode:boolean = false;
  user: Observable<User>;
  gameData: Observable<any>
  constructor(public gameService: GameService, private userService: UsersService, public dialog: MatDialog) {
    this.user = userService.getMyData();
  }

  ngOnInit() {
    this.gameService.gameEnded.subscribe((result:boolean) => {
        this.user = this.userService.getMyData();
    });
  }

  showBombs() {
    this.showBombsFlag = !this.showBombsFlag;
  }

  openRecords() {
    this.dialog.open(ContentDialogComponent, {
      width: '800px',
      data: { title: "RESULTS HISTORY" }
    });
  }

}
