import { ITile } from 'store/tileSlice'

const getLastWaypoint = (state: ITile[]): number =>
  state.reduce(
    (acc, tile) => (tile.waypoint && tile.waypoint > acc ? tile.waypoint : acc),
    1,
  )

export { getLastWaypoint }
