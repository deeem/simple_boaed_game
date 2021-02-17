import React, { FC } from 'react'
import { IPlayer } from 'store/playerSlice'
import {
  TileContainer,
  WaypointContainer,
  PlayersContainer,
} from './Tile.style'

type Props = {
  title?: string | number
  waypoint?: number
  players?: IPlayer[]
}

const Tile: FC<Props> = ({ title, waypoint, players }) => (
  <TileContainer>
    {waypoint && <WaypointContainer>{waypoint}</WaypointContainer>}
    {players && (
      <PlayersContainer>
        {players.map((player) => (
          <span key={player.id}>{player.name}</span>
        ))}
      </PlayersContainer>
    )}
  </TileContainer>
)

export { Tile }
