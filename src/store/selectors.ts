import { createDraftSafeSelector } from '@reduxjs/toolkit'
import { RootState } from './configureStore'
import { getLastWaypoint } from 'util/getLastWaypoint'

const selectTiles = (state: RootState) => state.tiles

const selectPlayers = (state: RootState) => state.players

const selectActivePlayerId = (state: RootState) => state.activePlayer

const selectTilesWithRelations = createDraftSafeSelector(
  selectPlayers,
  selectTiles,
  (players, tiles) =>
    tiles.map((tile) => {
      if (!('players' in tile)) return { ...tile }

      const tilePlayers = tile.players?.map((playerId) =>
        players.find((player) => player.id === playerId),
      )

      return { ...tile, players: tilePlayers }
    }),
)

const selectNextPlayer = createDraftSafeSelector(
  selectActivePlayerId,
  selectPlayers,
  (active, players) => {
    const lastPlayerIndx = players.length - 1

    const activePlayerIndx = players.findIndex((player) => player.id === active)

    const nextPlayerIndx =
      activePlayerIndx === lastPlayerIndx ? 0 : activePlayerIndx + 1

    return players[nextPlayerIndx]
  },
)

const selectLastWaypoint = createDraftSafeSelector(selectTiles, getLastWaypoint)

const selectFirstPlayer = createDraftSafeSelector(
  selectPlayers,
  (players) => players[0],
)

const selectActivePlayer = createDraftSafeSelector(
  selectActivePlayerId,
  selectPlayers,
  (activePlayerId, players) =>
    players.find((player) => player.id === activePlayerId),
)

const selectPlayerById = createDraftSafeSelector(
  selectPlayers,
  (_: RootState, id: string) => id,
  (players, id) => players.find((player) => player.id === id),
)

export { selectNextPlayer, selectTilesWithRelations }
