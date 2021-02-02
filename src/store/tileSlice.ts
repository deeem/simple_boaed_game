import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ITile {
  waypoint?: number
  players?: string | number[]
}

const initialState = [
  { waypoint: 1, players: [2, 3] },
  { waypoint: 7 },
  { waypoint: 8 },
  { waypoint: 9 },
  { waypoint: 2, players: [1] },
  { waypoint: 6 },
  {},
  { waypoint: 10 },
  { waypoint: 3 },
  { waypoint: 5 },
  {},
  { waypoint: 11 },
  {},
  { waypoint: 4 },
  {},
  { waypoint: 12 },
]

const tileSlice = createSlice({
  name: 'tiles',
  initialState,
  reducers: {
    add: (state, { payload }: PayloadAction<ITile>) => {
      //   state.push(payload)
    },
  },
})

export default tileSlice
