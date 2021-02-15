import React, { FC } from 'react'
import {
  TileContainer,
  WaypointContainer,
  PlayersContainer,
} from './Tile.style'

type Props = {
  title?: string | number
  waypoint?: number
  players?: string[]
}

const Tile: FC<Props> = ({ title, waypoint, players }) => (
  <TileContainer>
    {waypoint && <WaypointContainer>{waypoint}</WaypointContainer>}
    {players && <PlayersContainer>{players}</PlayersContainer>}
  </TileContainer>
)

export { Tile }
