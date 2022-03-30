import {Component, Input, OnInit} from '@angular/core';
import {TicketsStore} from "../../../../services/tickets-store";
import {interval, Subject, take, takeUntil, timer} from "rxjs";
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
  matchingNumbers: number = 0;

  gameOpen$$ = new Subject<void>();

  selectedNumbers: number[] = [];

  constructor(public store: TicketsStore) {
  }

  ngOnInit() {
    console.log(this.selectedNumbers);
    this.store.gameStateTest$.subscribe(res => {
      console.log('test', res)

      switch (res) {
        case 0:
          this.store.setPreState([], [], [])
          this.matchingNumbers = 0
          break;
        case 3:
          console.log(this.state.winningNumbers);
          console.log('LENGTH:', this.state.winningNumbers.length);
          if(this.state.winningNumbers.length > 0 && this.state.winningNumbers.length < 6) {
            console.log('TRUEEEEEEE');
            console.log('selected:', this.state.winningNumbers);
            this.selectedNumbers = this.state.winningNumbers
            this.startGame()
          } else {
            console.log('FALSEEEEE');
            this.startGame()
          }
          break;
        case 4:
          this.checkWinner()
          break;
      }

      this.nextPhase(res, this.store.stateTimeLeft);
    })

  }

  startGame() {

    const interval$ = interval(3000);

    if(this.selectedNumbers.length === 6) {
      this.selectedNumbers = []
    }

    interval$.pipe(takeUntil(this.gameOpen$$)).subscribe((tick) => {
      let random = this.getRandomNumber();
      while (this.selectedNumbers.some((n) => n === random)) {
        random = this.getRandomNumber();
      }
      if (this.selectedNumbers.length < 6) {
        this.selectedNumbers.push(random);
      } else {
        this.gameOpen$$.next();
      }

      console.log(random);
      console.log(this.selectedNumbers);

      this.store.setWinnerState(this.selectedNumbers)
    });
  }

  checkWinner() {

    const winners = this.state.winningNumbers

    console.log('winners:', winners);

    for(let i = 0; i < this.state.tickets.length; i++) {

      this.matchingNumbers = matching(winners, this.state.tickets[i].selectedNr);
      console.log(this.matchingNumbers)
      console.log('Matching Numbers:', this.matchingNumbers, 'ID:', this.state.tickets[i].uuid);

      if(this.matchingNumbers === 6) {
        if(!this.winningTicket.includes(this.state.tickets[i].uuid)) {
          this.winningTicket.push(this.state.tickets[i].uuid);
        }

        console.log(this.winningTicket)
      }

    }

    this.store.setTicketWinner(this.winningTicket)
  }

  nextPhase(phase: number, duration: number) {
    interval(1000).pipe(take(duration)).subscribe({
        next: res => {
          if(this.store.stateTimeLeft > 0) {
            this.store.countdown();
          }
        },
      complete: () => {
        console.log('IMPORTANT: PHASE:', phase);
        this.store.nextState(phase);
      }
      }
    )
  }

  checktest(w: number[], t: number[]) {
    return w.every(wn => t.includes(wn));
  }

  getRandomNumber() {
    return Math.floor((Math.random() * 39) + 1);
  }
}
