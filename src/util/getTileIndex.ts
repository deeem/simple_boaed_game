import { ITile } from 'store/tileSlice'

const getTileIndex = (tile: ITile, tiles: ITile[]): number => {
  return tiles.findIndex(({ id }) => id === tile.id)
}

export { getTileIndex }
