import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { BUTTON_LIFT, colors } from '../theme';

type Props = {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
};

export default function ActionButton({ onPress, style, children }: Props) {
  return (
    <View style={[styles.wrapper, style]}>
      <View style={styles.base} />
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.btn, pressed && styles.pressed]}
      >
        {children}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { position: 'relative' },
  base: {
    position: 'absolute',
    top: BUTTON_LIFT, left: 0, right: 0, bottom: 0,
    backgroundColor: colors.primaryDark,
    borderRadius: 6,
  },
  btn: {
    backgroundColor: colors.primary,
    borderWidth: 3,
    borderColor: colors.primaryDark,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginBottom: BUTTON_LIFT,
  },
  pressed: { transform: [{ translateY: BUTTON_LIFT }], marginBottom: 0 },
});
