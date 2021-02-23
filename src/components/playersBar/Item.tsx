import React, { FC } from 'react'
import { gameService } from 'gameService'
import { IPlayer } from 'store/playerSlice'
import styled from 'styled-components'

type Props = {
  player: IPlayer
  activePlayer: string
}

const Item: FC<Props> = ({ player, activePlayer }) => {
  const isActive = player.id === activePlayer

  const move = () => {
    const moves = window.prompt('enter moves: ', '1')
    gameService.send('player_move_input_recieved', { value: moves })
  }

  return (
    <PlayerContainer>
      <div>{player.name}</div>
      {isActive && <button onClick={move}>move</button>}
    </PlayerContainer>
  )
}

export { Item }

const PlayerContainer = styled.div`
  width: 50px;
  border: 1px solid #6dffd6;
  padding: 10px;
  margin-right: 1rem;
  background-color: cadetblue;
  color: white;
  text-align: center;
`
