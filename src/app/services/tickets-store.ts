import {ComponentStore} from "@ngrx/component-store";
import {Injectable} from "@angular/core";

export interface TicketDetails {
  uuid: string;
  numbers: number[];
  price: number;
}

export interface GameState {
  tickets: TicketDetails[],
  gameState: string,
  winningNumbers: number[]
  ticketWinner: string[]
}

export const initialState: GameState = {
  tickets: [],
  gameState: 'init',
  winningNumbers: [],
  ticketWinner: []
}

@Injectable()
export class TicketsStore extends ComponentStore<any> {

  constructor() {
    super(initialState);
    this.state$.subscribe(console.log)
    const state = localStorage.getItem('state');
    if(state) {
      this.patchState(JSON.parse(state));
    }
    this.state$.subscribe(state => localStorage.setItem('state', JSON.stringify(state)))
  }

  get state(): GameState {
    return this.get(s => s);
  }

  setGameState = (gameState: string) => this.patchState({gameState});

  setWinnerState = (winningNumbers: number[]) => this.patchState({winningNumbers});

  setTicketWinner = (ticketWinner: string[]) => this.patchState({ticketWinner});

  addTicket = this.updater((state, ticket: TicketDetails) => {
    const tickets = state.tickets;
    tickets.push(ticket);
    return {...state, tickets}
  })

}
