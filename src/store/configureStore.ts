import { configureStore, createDraftSafeSelector } from '@reduxjs/toolkit'
import activePlayerSlice from './activePlayerSlice'
import playerSlice from './playerSlice'
import tileSlice from './tileSlice'

const reducer = {
  tiles: tileSlice.reducer,
  players: playerSlice.reducer,
  activePlayer: activePlayerSlice.reducer,
}

const store = configureStore({ reducer })

export { store }

export type RootState = ReturnType<typeof store.getState>

/* Selectors */

export const getTilesData = (state: RootState) => state.tiles

export const getLastWaypoint = createDraftSafeSelector(getTilesData, (tiles) =>
  tiles.reduce(
    (acc, tile) => (tile.waypoint && tile.waypoint > acc ? tile.waypoint : acc),
    1,
  ),
)

export const getPlayers = (state: RootState) => state.players

export const getFirstPlayer = createDraftSafeSelector(
  getPlayers,
  (players) => players[0],
)

export const getActivePlayer = (state: RootState) => state.activePlayer

export const getNextPlayer = createDraftSafeSelector(
  getActivePlayer,
  getPlayers,
  (active, players) => {
    const lastPlayerIndx = players.length - 1

    const activePlayerIndx = players.findIndex(
      (player) => player.id === active.id,
    )

    const nextPlayerIndx =
      activePlayerIndx === lastPlayerIndx ? 0 : activePlayerIndx + 1

    return players[nextPlayerIndx]
  },
)

export const getPlayerById = createDraftSafeSelector(
  getPlayers,
  (_: RootState, id: string) => id,
  (players, id) => {
    return players.find((player) => player.id === id)
  },
)

export const getTiles = createDraftSafeSelector(
  getPlayers,
  getTilesData,
  (players, tiles) =>
    tiles.map((tile) => {
      if (!('players' in tile)) return { ...tile }

      const tilePlayers = tile.players?.map((playerId) =>
        players.find((player) => player.id === playerId),
      )

      return { ...tile, players: tilePlayers }
    }),
)
