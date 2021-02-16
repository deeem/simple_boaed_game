import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IPlayer } from './playerSlice'

const initialState: IPlayer = { id: '', name: '' }

const activePlayerSlice = createSlice({
  name: 'activePlayer',
  initialState,
  reducers: {
    setActive: (state, { payload }: PayloadAction<IPlayer>) => {
      state.id = payload.id
      state.name = payload.name
    },
  },
})

export default activePlayerSlice
