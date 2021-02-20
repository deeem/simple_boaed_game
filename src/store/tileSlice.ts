import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { initialTileSlice as initialState } from 'initialValues'
import { getLastWaypoint } from 'util/getLastWaypoint'

export interface ITile {
  waypoint?: number
  players?: string[]
}

const tileSlice = createSlice({
  name: 'tiles',
  initialState,
  reducers: {
    movePlayer: (
      state,
      { payload }: PayloadAction<{ id: string; value: number }>,
    ) => {
      const lastWaypoint = getLastWaypoint(state)

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
