import {
  ImageBackground,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { colors } from '../theme';

const parchmentBg = require('../../assets/Images/ParchmentBackground.jpg');

type ParchmentProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
};

export default function Parchment({ children, style, contentStyle }: ParchmentProps) {
  return (
    <View style={[styles.wrap, style]}>
      <View style={styles.seal} />
      <ImageBackground
        source={parchmentBg}
        style={styles.border}
        imageStyle={styles.bgImage}
        resizeMode="repeat"
      >
        <View style={[styles.content, contentStyle]}>{children}</View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'stretch',
  },
  seal: {
    alignSelf: 'center',
    width: 120,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.secondary,
    borderWidth: 2,
    borderColor: colors.secondaryDark,
    marginBottom: -13,
    zIndex: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  border: {
    borderWidth: 3,
    borderColor: colors.secondary,
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: colors.parchment,
  },
  bgImage: {
    borderRadius: 6,
    opacity: 0.9,
  },
  content: {
    width: '100%',
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
