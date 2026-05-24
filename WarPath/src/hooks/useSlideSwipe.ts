import { useRef } from 'react';
import { Animated, PanResponder } from 'react-native';

interface Options {
  screenWidth: number;
  countRef: React.MutableRefObject<number>;
  wrap?: boolean;
  onIndexChange?: (i: number) => void;
}

export function useSlideSwipe({ screenWidth, countRef, wrap = false, onIndexChange }: Options) {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const indexRef = useRef(0);
  const onIndexChangeRef = useRef(onIndexChange);
  onIndexChangeRef.current = onIndexChange;
  const swRef = useRef(screenWidth);
  swRef.current = screenWidth;

  const goToRef = useRef<(i: number) => void>(() => {});
  goToRef.current = (i: number) => {
    indexRef.current = i;
    onIndexChangeRef.current?.(i);
    Animated.spring(slideAnim, {
      toValue: -i * swRef.current,
      useNativeDriver: false,
      tension: 80,
      friction: 12,
    }).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gs) =>
        Math.abs(gs.dx) > 10 && Math.abs(gs.dx) > Math.abs(gs.dy),
      onPanResponderGrant: () => {
        slideAnim.stopAnimation();
      },
      onPanResponderMove: (_, gs) => {
        const sw = swRef.current;
        const base = -indexRef.current * sw;
        const min = -(countRef.current - 1) * sw;
        slideAnim.setValue(Math.max(min, Math.min(0, base + gs.dx)));
      },
      onPanResponderRelease: (_, gs) => {
        const sw = swRef.current;
        const count = countRef.current;
        const cur = indexRef.current;
        const atEnd = cur >= count - 1;
        const atStart = cur <= 0;

        if (gs.dx < -50) {
          if (!atEnd) goToRef.current(cur + 1);
          else if (wrap) goToRef.current(0);
          else slideAnim.setValue(-cur * sw);
        } else if (gs.dx > 50) {
          if (!atStart) goToRef.current(cur - 1);
          else if (wrap) goToRef.current(count - 1);
          else slideAnim.setValue(-cur * sw);
        } else {
          goToRef.current(cur);
        }
      },
    })
  ).current;

  return { slideAnim, panHandlers: panResponder.panHandlers, goTo: goToRef, indexRef };
}
