import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef, DoCheck } from '@angular/core';
import { GameService } from '../../services/game.service';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  showBombsFlag: boolean = false;
  user:Observable<User>;
  
  constructor(public game: GameService, private userService: UsersService) {
    this.user = userService.getMyData();
  }

  ngOnInit() {
    this.game.gameEnded.subscribe((result:boolean) => {
        this.user = this.userService.getMyData();
    });
  }

  showBombs() {
    this.showBombsFlag = !this.showBombsFlag;
  }

}
