import { ITile } from 'store/tileSlice'

const getLastWaypoint = (tiles: ITile[]): number =>
  tiles.reduce(
    (acc, tile) => (tile.waypoint && tile.waypoint > acc ? tile.waypoint : acc),
    1,
  )

export { getLastWaypoint }
