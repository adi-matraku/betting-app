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
}

export const initialState: GameState = {
  tickets: [],
  gameState: 'init'
}

@Injectable()
export class TicketsStore extends ComponentStore<any> {

  constructor() {
    super(initialState);
    this.state$.subscribe(console.log)
  }

  get state(): GameState {
    return this.get(s => s);
  }

  addTicket = this.updater((state, ticket: TicketDetails) => {
    const tickets = state.tickets;
    tickets.push(ticket);
    return {...state, tickets}
  })

  // addTicket = (ticket: TicketDetails) => this.updater((s, ticket: TicketDetails) => {
  //   const tickets = s.tickets;
  //   tickets.push(ticket);
  //   return {...s, tickets}
  // })

}
