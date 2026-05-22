import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { RootStackParamList } from '../navigation/RootNavigator';
import { colors } from '../theme';

const toothSmall = require('../../assets/Images/ToothSmall.png');

type NavProp = NativeStackNavigationProp<RootStackParamList>;

type Props = {
  tribeId: string;
  active: 'map' | 'train';
};

const BAR_HEIGHT = 60;
const CLAW_OVERHANG = 70;

export default function BottomNav({ tribeId, active }: Props) {
  const navigation = useNavigation<NavProp>();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.bar}>
          <View style={styles.toothColLeft}>
            <Image source={toothSmall} style={styles.tooth} resizeMode="contain" />
          </View>

          <Pressable style={styles.btnItem} onPress={() => navigation.navigate('Hub')}>
            <View style={styles.iconWrap}>
              <FontAwesome5 name="campground" size={30} color={colors.textLight} />
            </View>
          </Pressable>

          <Pressable style={[styles.btnItem, active === 'map' && styles.activeBtn]} onPress={() => navigation.navigate('Map', { tribeId })}>
            <View style={styles.iconWrap}>
              <FontAwesome5 name="map-marked-alt" size={30} color={colors.textLight} />
            </View>
          </Pressable>

          <Pressable style={[styles.btnItem, active === 'train' && styles.activeBtn]} onPress={() => navigation.navigate('TrainOrcs', { tribeId })}>
            <View style={styles.iconWrap}>
              <Image source={require('../../assets/Images/AnvilLogo.png')} style={styles.navIcon} resizeMode="contain" />
            </View>
          </Pressable>

          <View style={styles.toothColRight}>
            <Image source={toothSmall} style={[styles.tooth, styles.flipH]} resizeMode="contain" />
          </View>
        </View>
      </View>

      <View style={{ height: insets.bottom, backgroundColor: colors.statusBar }} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {},
  container: {
    width: '100%',
    height: BAR_HEIGHT + CLAW_OVERHANG,
    overflow: 'hidden',
    transform: [{ scaleY: -1 }],
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    height: BAR_HEIGHT,
    backgroundColor: colors.primary,
    borderBottomWidth: 2,
    borderBottomColor: colors.primaryDark,
  },
  toothColLeft: {
    width: '12%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginLeft: -8,
  },
  toothColRight: {
    width: '12%',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    marginRight: -8,
  },
  btnItem: {
    flex: 1,
    height: BAR_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeBtn: {
    backgroundColor: colors.primaryDark,
  },
  iconWrap: {
    transform: [{ scaleY: -1 }],
  },
  tooth: {
    width: 95,
    height: 150,
    marginTop: -30,
  },
  flipH: {
    transform: [{ scaleX: -1 }],
  },
  navIcon: {
    width: 30,
    height: 30,
    tintColor: colors.textLight,
  },
});
