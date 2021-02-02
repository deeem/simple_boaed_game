import { configureStore } from '@reduxjs/toolkit'
import tileSlice from './tileSlice'

const reducer = {
  tiles: tileSlice.reducer,
}

const store = configureStore({ reducer })

export { store }

export type RootState = ReturnType<typeof store.getState>
