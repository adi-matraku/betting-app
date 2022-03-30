import {ComponentStore} from "@ngrx/component-store";
import {Injectable} from "@angular/core";

export interface TicketDetails {
  uuid: string;
  selectedNr: number[];
  price: number;
}

export interface GameState {
  tickets: TicketDetails[];
  gameState: string;
  gameStateTest: number;
  stateTimeLeft: number;
  winningNumbers: number[];
  ticketWinner: string[];
}

export const gameInformation: { status: string, duration: number }[] = [
  {
    "status": 'pre-game',
    "duration": 10
  },
  {
    "status": 'init',
    "duration": 20
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
    "duration": 10
  },
];

// export const gameStates = ['init', 'playing', 'finished'];
// export const durations = [2, 3, 5];

export const initialState: GameState = {
  tickets: [],
  gameState: gameInformation[1].status,
  winningNumbers: [],
  gameStateTest: 0,
  stateTimeLeft: gameInformation[1].duration,
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

  get stateTimeLeft(): number {
    return this.get(s => s.stateTimeLeft)
  }

  setInitialState = () => this.patchState(initialState);

  setGameState = (gameState: string) => this.patchState({gameState});

  setWinnerState = (winningNumbers: number[]) => this.patchState({winningNumbers});

  setTicketWinner = (ticketWinner: string[]) => this.patchState({ticketWinner});

  setTickets = (tickets: []) => this.patchState({tickets});

  setPreState = (winningNumbers: number[], ticketWinner: string[], tickets: []) =>
    this.patchState({winningNumbers, ticketWinner, tickets})

  nextState = this.updater((s, phase: number) => {
    if(phase < gameInformation.length - 1) {
      return {...s, gameState: gameInformation[phase + 1].status, gameStateTest: phase + 1,
        stateTimeLeft: gameInformation[phase + 1].duration}
    } else {
      return {...s, gameState: gameInformation[0].status, gameStateTest: 0, stateTimeLeft: gameInformation[0].duration}
    }
  });

  countdown = () => this.patchState({stateTimeLeft: this.stateTimeLeft -1})

  addTicket = this.updater((state, ticket: TicketDetails) => {
    const tickets = state.tickets;
    tickets.push(ticket);
    return {...state, tickets}
  })

}
