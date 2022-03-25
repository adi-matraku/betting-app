import {Component, Input, OnInit} from '@angular/core';
import {TicketsStore} from "../../../../services/tickets-store";
import {interval, Subject, takeUntil} from "rxjs";
import {GameState} from "../../../../models/ticket.model";
import {matching} from "../../utils/matching";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  @Input() state!: GameState

  winningTicket: string[] = [];
  matchingNumbers = 0;

  gameOpen$$ = new Subject<void>();

  selectedNumbers: number[] = [];

  constructor(public store: TicketsStore) { }

  ngOnInit() {

  }

  startGame() {

    this.store.setGameState('started');

    const interval$ = interval(3000);

    interval$.pipe(takeUntil(this.gameOpen$$)).subscribe((tick) => {
      let random = this.getRandomNumber();
      while (this.selectedNumbers.some((n) => n === random)) {
        random = this.getRandomNumber();
      }
      if (this.selectedNumbers.length < 6) {
        this.selectedNumbers.push(random);
      } else {
        console.log(this.selectedNumbers);
        this.store.setGameState('finished');
        console.log('finished')
        this.gameOpen$$.next();
      }

      console.log(random);

      this.store.setWinnerState(this.selectedNumbers)

      this.checkWinner()
    });
  }

  checkWinner() {

    const winners = this.state.winningNumbers

    // console.log('winners:', winners);

    for(let i = 0; i < this.state.tickets.length; i++) {

      this.matchingNumbers = matching(winners, this.state.tickets[i].selectedNr);

      console.log('Matching Numbers:', this.matchingNumbers, 'ID:', this.state.tickets[i].uuid);

      if(this.matchingNumbers === 6) {

        if (!this.winningTicket.includes(this.state.tickets[i].uuid)) {
          this.winningTicket.push(this.state.tickets[i].uuid);
        }

        console.log(this.winningTicket);
      }

    }

  }

  getRandomNumber() {
    return Math.floor((Math.random() * 39) + 1);
  }
}
