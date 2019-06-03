import { Component, Input } from '@angular/core';
import { GameService } from "../../services/game.service";

@Component({
  selector: 'app-game-area',
  templateUrl: './game-area.component.html',
  styleUrls: ['./game-area.component.css']
})
export class GameAreaComponent  {
	@Input() x: number;
	@Input() y: number;

	@Input() checked: boolean;
	@Input() hasBomb: boolean;
	@Input() neighbors: number;

	constructor(public game: GameService) { }

}
