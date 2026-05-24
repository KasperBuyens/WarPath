import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type PressableProps,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

import { colors } from '../theme';

type ButtonProps = {
  label: string;
  onPress?: PressableProps['onPress'];
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  compact?: boolean;
  noLift?: boolean;
};

const LIFT = 6;

export default function Button({
  label,
  onPress,
  style,
  textStyle,
  disabled,
  compact,
  noLift,
}: ButtonProps) {
  return (
    <View style={[styles.wrapper, disabled && styles.wrapperDisabled, style]}>
      <View style={styles.base} />
      <Pressable
        onPress={onPress}
        disabled={disabled}
        style={({ pressed }) => [
          styles.button,
          compact && styles.buttonCompact,
          pressed && !noLift && styles.pressed,
          pressed && noLift && styles.pressedScale,
        ]}
      >
        <Text style={[styles.label, compact && styles.labelCompact, textStyle]}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    width: '100%',
  },
  wrapperDisabled: {
    opacity: 0.5,
  },
  base: {
    position: 'absolute',
    top: LIFT,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.primaryDark,
    borderRadius: 6,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 6,
    borderWidth: 3,
    borderColor: colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: LIFT,
  },
  buttonCompact: {
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  pressed: {
    transform: [{ translateY: LIFT }],
    marginBottom: 0,
  },
  pressedScale: {
    transform: [{ scale: 0.93 }],
  },
  label: {
    color: colors.textLight,
    fontSize: 22,
    fontFamily: 'CaesarDressing',
    letterSpacing: 3,
    textTransform: 'uppercase',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  labelCompact: {
    fontSize: 11,
    letterSpacing: 1,
  },
});
