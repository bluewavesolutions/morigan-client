import { createSlice } from '@reduxjs/toolkit';

interface GameState {
}

const initialState: GameState = {
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
  },
});

export const {} = gameSlice.actions;
export default gameSlice.reducer;
