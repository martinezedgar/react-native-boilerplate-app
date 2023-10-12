import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { exampleCounterSlice } from './slices/exampleCounter'
import { exampleApi } from '../services/exampleApi'

const rootReducer = combineReducers({
  exampleCounter: exampleCounterSlice.reducer,
  [exampleApi.reducerPath]: exampleApi.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
      getDefaultMiddleware()
        .concat(exampleApi.middleware)
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store