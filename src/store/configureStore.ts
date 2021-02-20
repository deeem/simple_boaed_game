import { configureStore } from '@reduxjs/toolkit'
import activePlayerSlice from './activePlayerSlice'
import playerSlice from './playerSlice'
import tileSlice from './tileSlice'

const reducer = {
  tiles: tileSlice.reducer,
  players: playerSlice.reducer,
  activePlayer: activePlayerSlice.reducer,
}

const store = configureStore({ reducer })

export { store }

export type RootState = ReturnType<typeof store.getState>
