import { configureStore, createSelector } from '@reduxjs/toolkit'
import tileSlice from './tileSlice'

const reducer = {
  tiles: tileSlice.reducer,
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
