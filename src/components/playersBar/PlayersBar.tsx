import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'store/configureStore'
import styled from 'styled-components'
import { Item } from './Item'

const PlayersBar: FC = () => {
  const players = useSelector((state: RootState) => state.players)
  const activePlayer = useSelector((state: RootState) => state.activePlayer)

  return (
    <BarContainer>
      {players.map((player) => (
        <Item player={player} activePlayer={activePlayer} key={player.id} />
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
