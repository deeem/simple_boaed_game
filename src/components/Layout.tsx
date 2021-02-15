import React, { FC } from 'react'
import { Tile } from './Tile'
import { TilesContainer } from './Layout.style'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store/configureStore'
import tileSlice from 'store/tileSlice'

// import { store } from 'store/configureStore'

const Layout: FC = () => {
  const tiles = useSelector((state: RootState) => state.tiles)
  const dispatch = useDispatch()

  const dimensions = [4, 4]
  const [xMax, yMax] = dimensions

  // store.getState().tiles.

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
          dispatch(
            tileSlice.actions.movePlayer({
              id: '6c4f7868-d6ca-4862-a850-9ee8c813724c',
              value: 2,
            }),
          )
        }
      >
        click
      </button>
    </TilesContainer>
  )
}

export { Layout }
