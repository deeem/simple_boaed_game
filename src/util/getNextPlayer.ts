import { IPlayer } from 'store/playerSlice'

const getNextPlayer = (active: string, players: IPlayer[]): IPlayer => {
  if (!active) return players[0]

  const activePlayerIndx = players.findIndex((player) => player.id === active)

  const lastPlayerIndx = players.length - 1

  const nextPlayerIndx =
    activePlayerIndx === lastPlayerIndx ? 0 : activePlayerIndx + 1

  return players[nextPlayerIndx]
}

export { getNextPlayer }
