import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type SettingsState = {
  cheatMode: boolean;
};

const initialState: SettingsState = {
  cheatMode: false,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setCheatMode: (state, action: PayloadAction<boolean>) => {
      state.cheatMode = action.payload;
    },
    toggleCheatMode: (state) => {
      state.cheatMode = !state.cheatMode;
    },
  },
});

export const { setCheatMode, toggleCheatMode } = settingsSlice.actions;
export default settingsSlice.reducer;
