import {ComponentStore} from "@ngrx/component-store";
import {Injectable} from "@angular/core";

export interface TicketDetails {
  uuid: string;
  selectedNr: number[];
  price: number;
}

export interface GameState {
  tickets: TicketDetails[];
  jackpot: number;
  gameState: string;
  gameStateIndex: number;
  stateTimeLeft: number;
  winningNumbers: number[];
  ticketWinner: string[];
}

export const gameInformation: { status: string, duration: number }[] = [
  {
    "status": 'pre-game',
    "duration": 15
  },
  {
    "status": 'init',
    "duration": 30
  },
  {
    "status": 'preparing',
    "duration": 10
  },
  {
    "status": 'playing',
    "duration": 25
  },
  {
    "status": 'finished',
    "duration": 15
  },
];

export const initialState: GameState = {
  tickets: [],
  jackpot: 1000,
  gameState: gameInformation[1].status,
  winningNumbers: [],
  gameStateIndex: 1,
  stateTimeLeft: gameInformation[1].duration,
  ticketWinner: []
}

@Injectable()
export class TicketsStore extends ComponentStore<GameState> {

  gameStateIndex$ = this.select(s => s.gameStateIndex)

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

  get gameStateIndex(): number {
    return this.get(s => s.gameStateIndex)
  }

  get stateTimeLeft(): number {
    return this.get(s => s.stateTimeLeft)
  }

  setWinnerState = (winningNumbers: number[]) => this.patchState({winningNumbers});

  setTicketWinner = (ticketWinner: string[]) => this.patchState({ticketWinner});

  setTickets = (tickets: []) => this.patchState({tickets});

  setJackpot = (jackpot: number) => this.patchState({jackpot});

  setPreState = (winningNumbers: number[], ticketWinner: string[], tickets: []) =>
    this.patchState({winningNumbers, ticketWinner, tickets})

  nextState = this.updater((s, phase: number) => {
    if(phase < gameInformation.length - 1) {
      return {...s, gameState: gameInformation[phase + 1].status, gameStateIndex: phase + 1,
        stateTimeLeft: gameInformation[phase + 1].duration}
    } else {
      return {...s, gameState: gameInformation[0].status, gameStateIndex: 0, stateTimeLeft: gameInformation[0].duration}
    }
  });

  countdown = () => this.patchState({stateTimeLeft: this.stateTimeLeft -1})

  addTicket = this.updater((state, ticket: TicketDetails) => {
    const tickets = state.tickets;
    tickets.push(ticket);
    return {...state, tickets}
  })

}
