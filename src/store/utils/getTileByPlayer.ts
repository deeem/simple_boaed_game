import { ITile } from 'store/tileSlice'

const getTileByPlayer = (playerId: number, tiles: ITile[]): ITile => {
  const currentTileIndx = tiles.findIndex((tile) =>
    tile.players?.includes(playerId),
  )

  return tiles[currentTileIndx]
}

export { getTileByPlayer }
