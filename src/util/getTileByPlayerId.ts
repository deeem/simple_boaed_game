import { ITile } from 'store/tileSlice'

const getTileByPlayerId = (playerId: string, tiles: ITile[]): ITile => {
  const currentTileIndx = tiles.findIndex((tile) =>
    tile.players?.includes(playerId),
  )

  return tiles[currentTileIndx]
}

export { getTileByPlayerId }
