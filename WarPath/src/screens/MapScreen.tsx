import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp, RouteProp } from '@react-navigation/native-stack';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import BottomNav from '../components/BottomNav';
import Header from '../components/Header';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { colors, parchmentWidth, spacing } from '../theme';

type MapNavProp = NativeStackNavigationProp<RootStackParamList, 'Map'>;
type MapRouteProp = RouteProp<RootStackParamList, 'Map'>;

type TribeProgress = {
  vikingWon: boolean;
  horseWon: boolean;
  castleWon: boolean;
};

const mapImage = require('../../assets/Images/WarPath Map.jpg');
const background = require('../../assets/Images/StoneBackground.jpg');

const { width: IMG_W, height: IMG_H } = Image.resolveAssetSource(mapImage);
const HEADER_HEIGHT = 130;
const NAV_HEIGHT = 130; // BAR_HEIGHT(60) + CLAW_OVERHANG(70)

const LOCATIONS = [
  { id: 'vikingFleet', label: 'Viking Fleet', top: '22%', left: '18%', requires: null },
  { id: 'horseBaron',  label: 'Baron Ambush', top: '52%', left: '54%', requires: 'vikingWon' as keyof TribeProgress },
  { id: 'castle',      label: 'Castle Siege', top: '74%', left: '32%', requires: 'horseWon' as keyof TribeProgress },
] as const;

export default function MapScreen() {
  const navigation = useNavigation<MapNavProp>();
  const { params } = useRoute<MapRouteProp>();
  const { user } = useAuth();
  const { width: screenWidth } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [progress, setProgress] = useState<TribeProgress | null>(null);

  const mapWidth = screenWidth * parseFloat(parchmentWidth) / 100;
  const mapHeight = mapWidth * (IMG_H / IMG_W);

  useEffect(() => {
    if (!user) return;
    const ref = doc(db, 'users', user.uid, 'tribes', params.tribeId);
    return onSnapshot(ref, (snap) => {
      if (snap.exists()) setProgress(snap.data() as TribeProgress);
    });
  }, [user, params.tribeId]);

  function isAvailable(requires: keyof TribeProgress | null): boolean {
    if (requires === null) return true;
    return progress?.[requires] === true;
  }

  return (
    <ImageBackground source={background} style={styles.background} resizeMode="cover">
      <SafeAreaView style={styles.safeArea} edges={[]}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={{
            alignItems: 'center',
            paddingTop: insets.top + HEADER_HEIGHT + spacing.md,
            paddingBottom: insets.bottom + NAV_HEIGHT + spacing.md,
          }}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View style={styles.mapFrame}>
            <View style={{ width: mapWidth, height: mapHeight }}>
              <Image source={mapImage} style={styles.mapImage} resizeMode="stretch" />

              {LOCATIONS.map((loc) => {
                const available = isAvailable(loc.requires);
                return (
                  <Pressable
                    key={loc.id}
                    style={[styles.locationBtn, { top: loc.top, left: loc.left }, available ? styles.btnAvailable : styles.btnLocked]}
                    onPress={() => available && navigation.navigate('Battle', { tribeId: params.tribeId, locationId: loc.id })}
                  >
                    <Text style={[styles.btnLabel, !available && styles.btnLabelLocked]}>
                      {loc.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </ScrollView>

        {/* BottomNav sits at the bottom as an overlay — no pointerEvents wrapper so buttons work */}
        <View style={styles.footerOverlay}>
          <BottomNav tribeId={params.tribeId} active="map" />
        </View>

        <View style={styles.headerOverlay} pointerEvents="none">
          <Header title="MAP" />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const BTN_W = 120;
const BTN_H = 44;

const styles = StyleSheet.create({
  background: { flex: 1 },
  safeArea: { flex: 1 },
  scroll: { flex: 1 },
  mapFrame: {
    borderWidth: 4,
    borderColor: '#5C5C5C',
    borderRadius: 4,
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  locationBtn: {
    position: 'absolute',
    width: BTN_W,
    height: BTN_H,
    marginLeft: -(BTN_W / 2),
    marginTop: -(BTN_H / 2),
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  btnAvailable: {
    backgroundColor: 'rgba(90, 14, 18, 0.82)',
    borderColor: 'rgba(43, 5, 7, 0.9)',
  },
  btnLocked: {
    backgroundColor: 'rgba(80, 80, 80, 0.55)',
    borderColor: 'rgba(50, 50, 50, 0.6)',
  },
  btnLabel: {
    color: colors.textLight,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  btnLabelLocked: {
    color: 'rgba(200, 200, 200, 0.6)',
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  footerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
