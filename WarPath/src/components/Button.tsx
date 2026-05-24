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

import { BUTTON_LIFT, colors, darkTextShadow } from '../theme';

type ButtonProps = {
  label: string;
  onPress?: PressableProps['onPress'];
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  compact?: boolean;
  noLift?: boolean;
};

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
      <Pressable
        onPress={onPress}
        disabled={disabled}
        style={({ pressed }) => [
          styles.pressableWrap,
          pressed && noLift && styles.pressedScale,
        ]}
      >
        {({ pressed }) => (
          <>
            <View style={styles.base} />
            <View style={[
              styles.button,
              compact && styles.buttonCompact,
              pressed && !noLift && styles.pressed,
            ]}>
              <Text style={[styles.label, compact && styles.labelCompact, textStyle]}>{label}</Text>
            </View>
          </>
        )}
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
  pressableWrap: {
    width: '100%',
  },
  base: {
    position: 'absolute',
    top: BUTTON_LIFT,
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
    marginBottom: BUTTON_LIFT,
  },
  buttonCompact: {
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  pressed: {
    transform: [{ translateY: BUTTON_LIFT }],
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
    ...darkTextShadow,
  },
  labelCompact: {
    fontSize: 11,
    letterSpacing: 1,
  },
});
