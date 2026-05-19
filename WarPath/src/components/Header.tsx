import { Image, StyleSheet, Text, View } from 'react-native';

const toothBig = require('../../assets/Images/ToothBig.png');
const toothSmall = require('../../assets/Images/ToothSmall.png');

type HeaderProps = {
  title: string;
};

export default function Header({ title }: HeaderProps) {
  return (
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
  );
}

const BAR_HEIGHT = 60;
const CLAW_OVERHANG = 70;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: BAR_HEIGHT + CLAW_OVERHANG,
    overflow: 'hidden',
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    height: BAR_HEIGHT,
    backgroundColor: '#5A0E12',
    borderBottomWidth: 2,
    borderBottomColor: '#2B0507',
  },
  colSm: {
    width: '12%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  colTitle: {
    width: '52%',
    height: BAR_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
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
