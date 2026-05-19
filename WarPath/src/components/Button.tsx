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

type ButtonProps = {
  label: string;
  onPress?: PressableProps['onPress'];
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
};

const LIFT = 6;

export default function Button({
  label,
  onPress,
  style,
  textStyle,
  disabled,
}: ButtonProps) {
  return (
    <View style={[styles.wrapper, disabled && styles.wrapperDisabled, style]}>
      <View style={styles.base} />
      <Pressable
        onPress={onPress}
        disabled={disabled}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.pressed,
        ]}
      >
        <Text style={[styles.label, textStyle]}>{label}</Text>
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
    backgroundColor: '#2B0507',
    borderRadius: 6,
  },
  button: {
    backgroundColor: '#5A0E12',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 6,
    borderWidth: 3,
    borderColor: '#2B0507',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: LIFT,
  },
  pressed: {
    transform: [{ translateY: LIFT }],
    marginBottom: 0,
  },
  label: {
    color: '#F4E4D7',
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 3,
    textTransform: 'uppercase',
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
});
