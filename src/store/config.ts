import { configureStore } from '@reduxjs/toolkit'
import { exampleCounterSlice } from './slices/exampleCounter'

export const store = configureStore({
  reducer: {
    exampleCounter: exampleCounterSlice.reducer
  },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store