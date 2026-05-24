import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type TribeState = {
  activeTribeId: string | null;
};

const initialState: TribeState = {
  activeTribeId: null,
};

export const tribeSlice = createSlice({
  name: 'tribe',
  initialState,
  reducers: {
    setActiveTribe: (state, action: PayloadAction<string>) => {
      state.activeTribeId = action.payload;
    },
    clearActiveTribe: (state) => {
      state.activeTribeId = null;
    },
  },
});

export const { setActiveTribe, clearActiveTribe } = tribeSlice.actions;
export default tribeSlice.reducer;
