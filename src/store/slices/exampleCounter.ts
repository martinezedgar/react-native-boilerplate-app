import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../config';

interface ExampleCounterState {
  value: number;
}

const initialState: ExampleCounterState = {
  value: 0,
};

export const exampleCounterSlice = createSlice({
  name: 'exampleCounter',
  initialState,
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const {increment, decrement, incrementByAmount} =
  exampleCounterSlice.actions;

export const selectCount = (state: RootState) => state.exampleCounter.value;

export default exampleCounterSlice.reducer;
