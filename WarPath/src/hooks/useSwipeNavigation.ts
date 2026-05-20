import { useRef } from 'react';
import { PanResponder } from 'react-native';

export function useSwipeNavigation(onSwipe: () => void) {
  return useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gs) =>
        Math.abs(gs.dx) > 10 && Math.abs(gs.dx) > Math.abs(gs.dy),
      onPanResponderRelease: (_, gs) => {
        if (Math.abs(gs.dx) > 50) {
          onSwipe();
        }
      },
    })
  ).current;
}
