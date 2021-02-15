import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'store/configureStore'
import styled from 'styled-components'

const PlayersBar: FC = () => {
  const players = useSelector((state: RootState) => state.players)

  return (
    <BarContainer>
      {players.map((player) => (
        <PlayerContainer key={player.id}>
          <div>{player.id}</div>
          <div>{player.name}</div>
        </PlayerContainer>
      ))}
    </BarContainer>
  )
}

export { PlayersBar }

const BarContainer = styled.div`
  display: flex;
  padding: 1rem;
  border: 1px dotted;
`

const PlayerContainer = styled.div`
  width: 50px;
  border: 1px solid #6dffd6;
  padding: 10px;
  margin-right: 1rem;
  background-color: cadetblue;
  color: white;
  text-align: center;
`
