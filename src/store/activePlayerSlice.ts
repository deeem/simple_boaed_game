import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: string = ''

const activePlayerSlice = createSlice({
  name: 'activePlayer',
  initialState,
  reducers: {
    setActive: (state, { payload }: PayloadAction<string>) => {
      // state = payload
      return payload
    },
  },
})

export default activePlayerSlice
