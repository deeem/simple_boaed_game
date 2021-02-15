import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ITile {
  waypoint?: number
  players?: (string | number)[]
}

const initialState: ITile[] = [
  { waypoint: 1, players: [2, 3] },
  { waypoint: 7 },
  { waypoint: 8 },
  { waypoint: 9 },
  { waypoint: 2, players: [1] },
  { waypoint: 6 },
  {},
  { waypoint: 10 },
  { waypoint: 3 },
  { waypoint: 5 },
  {},
  { waypoint: 11 },
  {},
  { waypoint: 4 },
  {},
  { waypoint: 12 },
]

const tileSlice = createSlice({
  name: 'tiles',
  initialState,
  reducers: {
    movePlayer: (
      state,
      { payload }: PayloadAction<{ id: number; value: number }>,
    ) => {
      const lastWaypoint = state.reduce(
        (acc, tile) =>
          tile.waypoint && tile.waypoint > acc ? tile.waypoint : acc,
        1,
      )

      const currentTileIndx = state.findIndex((tile) =>
        tile.players?.includes(payload.id),
      )

      const currentTile = state[currentTileIndx]

      const currentWaypoint = currentTile.waypoint || 1

      state[currentTileIndx] = {
        ...currentTile,
        players: currentTile.players?.filter(
          (playerId) => playerId !== payload.id,
        ),
      }

      const newWaypoint =
        currentWaypoint + payload.value < lastWaypoint
          ? currentWaypoint + payload.value
          : lastWaypoint

      const newWaypointTileIndx = state.findIndex(
        (tile) => tile.waypoint === newWaypoint,
      )

      const newWaypointTile = state[newWaypointTileIndx]

      state[newWaypointTileIndx] = {
        ...newWaypointTile,
        players: [...(newWaypointTile.players || []), payload.id],
      }

      // TODO: convert to selectors:
      // [*] getLastWaypoint
      // [ ] getCurrentWaypoint
      // [*] getTileByPlayer
      // [ ] getTileByWaypoint

      //

      /*      
      {
        type: 'tiles/movePlayer',
        payload: {id: 1, value: 2}
      }      
      */
    },
  },
})

export default tileSlice
