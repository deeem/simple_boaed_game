import React, { FC } from 'react'
import { Tile } from './Tile'
import { TilesContainer } from './Layout.style'
import { useSelector } from 'react-redux'
import { getTiles } from 'store/configureStore'
import { IPlayer } from 'store/playerSlice'

type TileExpanded = {
  waypoint?: number
  players?: IPlayer[]
}

const Layout: FC = () => {
  const tiles = useSelector(getTiles) as TileExpanded[]

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
