import {Component, Input} from '@angular/core';
import {GameState} from "../../../../models/ticket.model";

@Component({
  selector: 'app-played-tickets',
  templateUrl: './played-tickets.component.html',
  styleUrls: ['./played-tickets.component.scss']
})
export class PlayedTicketsComponent {

  @Input() state!: GameState;

  constructor() {
  }

}
