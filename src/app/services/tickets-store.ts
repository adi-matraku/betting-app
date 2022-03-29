import {ComponentStore} from "@ngrx/component-store";
import {Injectable} from "@angular/core";

export interface TicketDetails {
  uuid: string;
  selectedNr: number[];
  price: number;
}

export interface GameDetails {
  state: string;
  duration: number | undefined;
}

export interface GameState {
  tickets: TicketDetails[];
  gameState: string;
  gameStateTest: number;
  testDuration: number;
  winningNumbers: number[];
  ticketWinner: string[];
}

export const gameInformation: { status: string, duration: number }[] = [
  {
    "status": 'init',
    "duration": 20
  },
  {
    "status": 'playing',
    "duration": 30
  },
  {
    "status": 'finished',
    "duration": 10
  },
];

export const gameStates = ['init', 'playing', 'finished'];
export const durations = [2, 3, 5];

export const initialState: GameState = {
  tickets: [],
  gameState: gameInformation[0].status,
  winningNumbers: [],
  gameStateTest: 0,
  testDuration: gameInformation[0].duration,
  ticketWinner: []
}

@Injectable()
export class TicketsStore extends ComponentStore<GameState> {

  gameStateTest$ = this.select(s => s.gameStateTest)

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

  get gameStateTest(): number {
    return this.get(s => s.gameStateTest)
  }

  get testDuration(): number {
    return this.get(s => s.testDuration)
  }

  setGameState = (gameState: string) => this.patchState({gameState});

  setWinnerState = (winningNumbers: number[]) => this.patchState({winningNumbers});

  setTicketWinner = (ticketWinner: string[]) => this.patchState({ticketWinner});

  nextState = this.updater((s, phase: number) => {
    if(phase < gameStates.length - 1) {
      return {...s, gameStateTest: phase + 1, testDuration: durations[phase + 1]}
    } else {
      return {...s, gameStateTest: 0, testDuration: durations[0]}
    }
  });

  countdown = () => this.patchState({testDuration: this.testDuration -1})

  addTicket = this.updater((state, ticket: TicketDetails) => {
    const tickets = state.tickets;
    tickets.push(ticket);
    return {...state, tickets}
  })

}
