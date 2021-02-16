import { configureStore, createSelector } from '@reduxjs/toolkit'
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

export const getTiles = (state: RootState) => state.tiles

export const getLastWaypoint = createSelector(getTiles, (tiles) =>
  tiles.reduce(
    (acc, tile) => (tile.waypoint && tile.waypoint > acc ? tile.waypoint : acc),
    1,
  ),
)

export const getPlayers = (state: RootState) => state.players

export const getFirstPlayer = createSelector(
  getPlayers,
  (players) => players[0],
)

export const getActivePlayer = (state: RootState) => state.activePlayer

export const getNextPlayer = createSelector(
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
