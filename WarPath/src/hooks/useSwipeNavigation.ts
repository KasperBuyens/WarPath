import { useRef } from 'react';
import { PanResponder } from 'react-native';

type Direction = 'left' | 'right' | 'both';

export function useSwipeNavigation(onSwipe: () => void, direction: Direction = 'both') {
  const onSwipeRef = useRef(onSwipe);
  onSwipeRef.current = onSwipe;

  return useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gs) =>
        Math.abs(gs.dx) > 10 && Math.abs(gs.dx) > Math.abs(gs.dy),
      onPanResponderRelease: (_, gs) => {
        const triggered =
          direction === 'both'
            ? Math.abs(gs.dx) > 50
            : direction === 'left'
            ? gs.dx < -50
            : gs.dx > 50;
        if (triggered) onSwipeRef.current();
      },
    })
  ).current;
}
