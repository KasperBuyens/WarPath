import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme';

type DividerProps = {
  symbol?: string;
};

export default function Divider({ symbol = '☠' }: DividerProps) {
  return (
    <View style={styles.row}>
      <View style={styles.line} />
      <Text style={styles.symbol}>{symbol}</Text>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 4,
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: colors.secondary,
    opacity: 0.6,
  },
  symbol: {
    fontSize: 20,
    color: colors.secondary,
  },
});
