import {Component, Input, OnInit} from '@angular/core';
import {TicketsStore} from "../../../../services/tickets-store";
import {GameState} from "../../../../models/ticket.model";

@Component({
  selector: 'app-played-tickets',
  templateUrl: './played-tickets.component.html',
  styleUrls: ['./played-tickets.component.scss']
})
export class PlayedTicketsComponent implements OnInit {

  // @Input() ticket!: number[];
  @Input() state!: GameState;

  constructor(public store: TicketsStore) {
    // this.store.state$.subscribe((res)=> console.log(res.tickets))
  }

  ngOnInit(): void {
  }

}
