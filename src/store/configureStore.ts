import { configureStore, createSelector } from '@reduxjs/toolkit'
import playerSlice from './playerSlice'
import tileSlice from './tileSlice'

const reducer = {
  tiles: tileSlice.reducer,
  players: playerSlice.reducer,
}

const store = configureStore({ reducer })

export { store }

export type RootState = ReturnType<typeof store.getState>

/* Selectors */

// const getLastWaypoint = (state: RootState) =>
export const getTiles = (state: RootState) => state.tiles

export const getLastWaypoint = createSelector(getTiles, (tiles) =>
  tiles.reduce(
    (acc, tile) => (tile.waypoint && tile.waypoint > acc ? tile.waypoint : acc),
    1,
  ),
)
