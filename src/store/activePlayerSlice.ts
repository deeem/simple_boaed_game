import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { initialactivePlayerSlice as initialState } from 'initialValues'

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
