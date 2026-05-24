import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import settingsReducer, { setCheatMode } from './settingsSlice';
import tribeReducer from './tribeSlice';

const STORAGE_KEY = '@warpath_settings';

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    tribe: tribeReducer,
  },
});

// Persist settings to AsyncStorage whenever they change
store.subscribe(() => {
  const { settings } = store.getState();
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(settings)).catch(() => {});
});

// Load persisted settings on startup
export async function loadPersistedState() {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    if (json) {
      const saved = JSON.parse(json) as { cheatMode?: boolean };
      if (typeof saved.cheatMode === 'boolean') {
        store.dispatch(setCheatMode(saved.cheatMode));
      }
    }
  } catch {
    // no-op — first launch or corrupted storage
  }
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T>(selector: (state: RootState) => T) =>
  useSelector(selector);
