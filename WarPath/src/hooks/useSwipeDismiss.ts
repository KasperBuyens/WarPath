import { useRef } from 'react';
import { Animated, PanResponder } from 'react-native';

export function useSwipeDismiss(screenWidth: number, onDismiss: () => void) {
  const translateX = useRef(new Animated.Value(0)).current;
  const onDismissRef = useRef(onDismiss);
  onDismissRef.current = onDismiss;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gs) =>
        gs.dx > 10 && Math.abs(gs.dx) > Math.abs(gs.dy),
      onPanResponderGrant: () => {
        translateX.stopAnimation();
      },
      onPanResponderMove: (_, gs) => {
        translateX.setValue(Math.max(0, gs.dx));
      },
      onPanResponderRelease: (_, gs) => {
        if (gs.dx > screenWidth * 0.35 || gs.vx > 0.5) {
          Animated.timing(translateX, {
            toValue: screenWidth,
            duration: 180,
            useNativeDriver: true,
          }).start(() => onDismissRef.current());
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
            tension: 80,
            friction: 12,
          }).start();
        }
      },
    })
  ).current;

  return { translateX, panHandlers: panResponder.panHandlers };
}
