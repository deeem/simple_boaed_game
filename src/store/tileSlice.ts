import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { initialTileSlice as initialState } from 'initialValues'
import { getLastWaypoint } from 'util/getLastWaypoint'
import { getTileByPlayerId } from 'util/getTileByPlayerId'
import { getTileByWaypoint } from 'util/getTileByWaypoint'
import { getTileIndex } from 'util/getTileIndex'
import { movePlayerForward } from 'util/movePlayerForward'

export interface ITile {
  id: number
  waypoint?: number
  players?: string[]
}

const tileSlice = createSlice({
  name: 'tiles',
  initialState,
  reducers: {
    movePlayerForward: (state, { payload }: PayloadAction<{ id: string }>) => {
      movePlayerForward(payload.id, state)
    },
    movePlayer: (
      state,
      { payload }: PayloadAction<{ id: string; value: number }>,
    ) => {
      const lastWaypoint = getLastWaypoint(state)

      const playerTile = getTileByPlayerId(payload.id, state)

      const playerCurrentWaypoint = playerTile.waypoint || 1

      const destinationWaypoint =
        playerCurrentWaypoint + payload.value < lastWaypoint
          ? playerCurrentWaypoint + payload.value
          : lastWaypoint

      const destinationTile = getTileByWaypoint(destinationWaypoint, state)

      state[getTileIndex(playerTile, state)] = {
        ...playerTile,
        players: playerTile.players?.filter(
          (playerId) => playerId !== payload.id,
        ),
      }

      state[getTileIndex(destinationTile, state)] = {
        ...destinationTile,
        players: [...(destinationTile.players || []), payload.id],
      }
    },
  },
})

export default tileSlice
