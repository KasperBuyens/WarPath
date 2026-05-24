import {
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

import { colors } from '../theme';

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
    backgroundColor: colors.oocBackground,
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginVertical: 8,
  },
  text: {
    color: colors.oocText,
    fontSize: 17,
    lineHeight: 25,
    fontStyle: 'italic',
  },
});
