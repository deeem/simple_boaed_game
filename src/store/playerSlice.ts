import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IPlayer {
  id: string
  name: string
}

const initialState: IPlayer[] = [
  { id: 'd79d7512-6fb5-11eb-9439-0242ac130002', name: 'bob' },
  { id: 'eea39748-ff40-40c8-9942-c2f690b43a2c', name: 'mary' },
  { id: '6c4f7868-d6ca-4862-a850-9ee8c813724c', name: 'john' },
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
