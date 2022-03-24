import { Component, OnInit } from '@angular/core';
import {TicketsStore} from "../../../../services/tickets-store";
import {Subject} from "rxjs";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  gameOpen$$ = new Subject<void>();

  constructor(public store: TicketsStore) { }

  ngOnInit(): void {
  }

}
