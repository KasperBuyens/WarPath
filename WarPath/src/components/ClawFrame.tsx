import { Image, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import toothBig from '../../assets/Images/ToothBig.png';

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export default function ClawFrame({ children, style }: Props) {
  return (
    <View style={[styles.container, style]}>
      {children}
      <Image source={toothBig} style={[styles.claw, styles.tl]} resizeMode="contain" />
      <Image source={toothBig} style={[styles.claw, styles.tr]} resizeMode="contain" />
      <Image source={toothBig} style={[styles.claw, styles.bl]} resizeMode="contain" />
      <Image source={toothBig} style={[styles.claw, styles.br]} resizeMode="contain" />
    </View>
  );
}

const SIZE = 90;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  claw: {
    position: 'absolute',
    width: SIZE,
    height: SIZE * 1.6,
    zIndex: 10,
  },
  tl: { top: -20, left: -20, transform: [{ rotate: '-45deg' }] },
  tr: { top: -20, right: -20, transform: [{ rotate: '45deg' }] },
  bl: { bottom: -20, left: -20, transform: [{ rotate: '225deg' }] },
  br: { bottom: -20, right: -20, transform: [{ rotate: '135deg' }] },
});
