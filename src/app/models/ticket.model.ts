export interface TicketDetails {
  uuid: string,
  selectedNr: number[],
  price: number,
}

export interface GameState {
  tickets: TicketDetails[],
  jackpot: number,
  gameState: string,
  gameStateIndex: number,
  stateTimeLeft: number,
  winningNumbers: number[],
  ticketWinner: string[],
}
