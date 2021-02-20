import { IPlayer } from 'store/playerSlice'

const getNextPlayer = (active: string, players: IPlayer[]): IPlayer => {
  const lastPlayerIndx = players.length - 1

  const activePlayerIndx = players.findIndex((player) => player.id === active)

  const nextPlayerIndx =
    activePlayerIndx === lastPlayerIndx ? 0 : activePlayerIndx + 1

  return players[nextPlayerIndx]
}

export { getNextPlayer }
