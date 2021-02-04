import React, { FC } from 'react'
import { Tile } from './Tile'
import { TilesContainer } from './Layout.style'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store/configureStore'
import tileSlice from 'store/tileSlice'

const Layout: FC = () => {
  const tiles = useSelector((state: RootState) => state.tiles)
  const dispatch = useDispatch()

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

  return (
    <TilesContainer>
      {blocks}
      <button
        onClick={() =>
          dispatch(tileSlice.actions.movePlayer({ id: 1, value: 2 }))
        }
      >
        click
      </button>
    </TilesContainer>
  )
}

export { Layout }
