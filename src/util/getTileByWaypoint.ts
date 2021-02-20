import { ITile } from 'store/tileSlice'

const getTileByWaypoint = (waypoint: number, tiles: ITile[]): ITile => {
  const currentTileIndx = tiles.findIndex((tile) => tile.waypoint === waypoint)

  return tiles[currentTileIndx]
}

export { getTileByWaypoint }
