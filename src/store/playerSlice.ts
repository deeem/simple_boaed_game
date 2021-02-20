import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { initialPlayerSlice as initialState } from '../initialValues'

export interface IPlayer {
  id: string
  name: string
}

const playerSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    addPlayer: (state, { payload }: PayloadAction<IPlayer>) => {
      // some code to add new player
    },
    removePlayer: (state, { payload }: PayloadAction<IPlayer>) => {
      // some code to remove player
    },
  },
})

export default playerSlice
