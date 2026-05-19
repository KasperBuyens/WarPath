import {
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

type OOCProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export default function OOC({ children, style, textStyle }: OOCProps) {
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.text, textStyle]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(60, 60, 60, 0.35)',
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginVertical: 8,
  },
  text: {
    color: '#1a1a1a',
    fontSize: 17,
    lineHeight: 25,
    fontStyle: 'italic',
  },
});
