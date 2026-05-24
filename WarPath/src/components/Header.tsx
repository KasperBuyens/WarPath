import { Image, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { navHeight, clawOverhang, colors } from '../theme';

import toothBig from '../../assets/Images/ToothBig.png';
import toothSmall from '../../assets/Images/ToothSmall.png';

type HeaderProps = {
  title: string;
};

export default function Header({ title }: HeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View>
      <View style={[styles.statusBarFill, { height: insets.top }]} />

      <View style={styles.container}>
        <View style={styles.bar}>
          <View style={styles.colSm}>
            <Image source={toothBig} style={styles.toothBig} resizeMode="contain" />
          </View>
          <View style={styles.colSm}>
            <Image source={toothSmall} style={styles.toothSmall} resizeMode="contain" />
          </View>
          <View style={styles.colTitle}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={styles.colSm}>
            <Image source={toothSmall} style={[styles.toothSmall, styles.flip]} resizeMode="contain" />
          </View>
          <View style={styles.colSm}>
            <Image source={toothBig} style={[styles.toothBig, styles.flip]} resizeMode="contain" />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statusBarFill: {
    width: '100%',
    backgroundColor: colors.primaryDarkest,
  },
  container: {
    width: '100%',
    height: navHeight + clawOverhang,
    overflow: 'hidden',
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    height: navHeight,
    backgroundColor: colors.primary,
    borderBottomWidth: 2,
    borderBottomColor: colors.primaryDark,
  },
  colSm: {
    width: '12%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  colTitle: {
    width: '52%',
    height: navHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: colors.textLight,
    fontSize: 24,
    fontFamily: 'CaesarDressing',
    letterSpacing: 3,
    textAlign: 'center',
  },
  toothBig: {
    width: 95,
    height: 150,
    marginTop: -30,
  },
  toothSmall: {
    width: 70,
    height: 120,
    marginTop: -30,
  },
  flip: {
    transform: [{ scaleX: -1 }],
  },
});
