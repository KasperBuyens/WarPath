import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { RootStackParamList } from '../navigation/RootNavigator';
import { BAR_HEIGHT, CLAW_OVERHANG, colors } from '../theme';

import anvilLogo from '../../assets/Images/AnvilLogo.png';
import toothSmall from '../../assets/Images/ToothSmall.png';

type NavProp = NativeStackNavigationProp<RootStackParamList>;

type Props = {
  tabProps: BottomTabBarProps;
};

export default function BottomNav({ tabProps }: Props) {
  const navigation = useNavigation<NavProp>();
  const insets = useSafeAreaInsets();

  const activeTab = tabProps.state.routes[tabProps.state.index].name;

  return (
    <View style={styles.wrapper} pointerEvents="box-none">
      <View style={styles.container} pointerEvents="box-none">
        <View style={styles.bar}>
          <View style={styles.toothColLeft} pointerEvents="none">
            <Image source={toothSmall} style={styles.tooth} resizeMode="contain" />
          </View>

          <Pressable style={styles.btnItem} onPress={() => navigation.navigate('Hub')}>
            <View style={styles.iconWrap}>
              <FontAwesome5 name="campground" size={30} color={colors.textLight} />
            </View>
          </Pressable>

          <Pressable
            style={[styles.btnItem, activeTab === 'MapTab' && styles.activeBtn]}
            onPress={() => tabProps.navigation.navigate('MapTab')}
          >
            <View style={styles.iconWrap}>
              <FontAwesome5 name="map-marked-alt" size={30} color={colors.textLight} />
            </View>
          </Pressable>

          <Pressable
            style={[styles.btnItem, activeTab === 'TrainTab' && styles.activeBtn]}
            onPress={() => tabProps.navigation.navigate('TrainTab')}
          >
            <View style={styles.iconWrap}>
              <Image source={anvilLogo} style={styles.navIcon} resizeMode="contain" />
            </View>
          </Pressable>

          <View style={styles.toothColRight} pointerEvents="none">
            <Image source={toothSmall} style={[styles.tooth, styles.flipH]} resizeMode="contain" />
          </View>
        </View>
      </View>

      <View style={styles.bottomStrip} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
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
  bottomStrip: {
    height: 40,
    backgroundColor: colors.statusBar,
  },
});
