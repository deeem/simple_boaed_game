import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getLastWaypoint } from 'util/getLastWaypoint'

export interface ITile {
  waypoint?: number
  players?: string[]
}

const initialState: ITile[] = [
  {
    waypoint: 1,
    players: [
      'eea39748-ff40-40c8-9942-c2f690b43a2c',
      '6c4f7868-d6ca-4862-a850-9ee8c813724c',
    ],
  },
  { waypoint: 7 },
  { waypoint: 8 },
  { waypoint: 9 },
  { waypoint: 2, players: ['d79d7512-6fb5-11eb-9439-0242ac130002'] },
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
