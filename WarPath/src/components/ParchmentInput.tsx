import {
  StyleSheet,
  TextInput,
  type StyleProp,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';

type ParchmentInputProps = TextInputProps & {
  style?: StyleProp<ViewStyle>;
};

export default function ParchmentInput({ style, ...props }: ParchmentInputProps) {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholderTextColor="#8B6B52"
      autoCapitalize="none"
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    backgroundColor: '#F5E6D3',
    borderWidth: 2,
    borderColor: '#8B5A3C',
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#31221e',
    textAlign: 'center',
  },
});
