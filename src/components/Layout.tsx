import React, { FC } from 'react'
import { Tile } from './Tile'
import { TilesContainer } from './Layout.style'
import { useSelector } from 'react-redux'
import { RootState } from 'store/configureStore'

const Layout: FC = () => {
  const tiles = useSelector((state: RootState) => state.tiles)

  const dimensions = [4, 4]
  const [xMax, yMax] = dimensions

  const blocks = []
  for (let i = 0; i < xMax * yMax; i++) {
    blocks.push(
      <Tile
        key={i}
        title={i}
        waypoint={tiles[i]?.waypoint}
        players={tiles[i]?.players}
      />,
    )
  }

  return <TilesContainer>{blocks}</TilesContainer>
}

export { Layout }
