import {
  StyleSheet,
  TextInput,
  type StyleProp,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';

import { colors } from '../theme';

type ParchmentInputProps = TextInputProps & {
  style?: StyleProp<ViewStyle>;
};

export default function ParchmentInput({ style, ...props }: ParchmentInputProps) {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholderTextColor={colors.textMuted}
      autoCapitalize="none"
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    backgroundColor: colors.parchment,
    borderWidth: 2,
    borderColor: colors.secondary,
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
  },
});
