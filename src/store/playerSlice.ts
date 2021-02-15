import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IPlayer {
  id: string | number
  name: string
}

const initialState: IPlayer[] = [
  { id: 1, name: 'bob' },
  { id: 2, name: 'mary' },
  { id: 3, name: 'john' },
]

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
