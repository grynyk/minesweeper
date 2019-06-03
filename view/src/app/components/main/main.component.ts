import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  username:string;
  
  constructor(public game: GameService, private userService: UsersService) { }

  ngOnInit() {
    this.userService.getMyData().subscribe((user:User)=>{
      console.log(user);
      this.username = user.username;
    });
  }

}
