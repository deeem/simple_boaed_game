import React, { FC } from 'react'
import { Tile } from './Tile'
import { TilesContainer } from './Layout.style'

type TileProps = {
  waypoint?: number
  players?: string | number[]
}

type Props = {
  tiles: TileProps[]
}

export const tiles: TileProps[] = [
  { waypoint: 1, players: [2, 3] },
  { waypoint: 7 },
  { waypoint: 8 },
  { waypoint: 9 },
  { waypoint: 2, players: [1] },
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

const Layout: FC<Props> = (props) => {
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
