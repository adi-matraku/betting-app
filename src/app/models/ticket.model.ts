export interface TicketDetails {
  uuid: string,
  selectedNr: number[],
  price: number,
}

export interface GameState {
  tickets: TicketDetails[],
  gameState: string,
  gameStateTest: number,
  testDuration: number,
  winningNumbers: number[],
  ticketWinner: string[],
}
