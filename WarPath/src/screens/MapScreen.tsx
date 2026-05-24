import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';
import { Image, ImageBackground, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import Header from '../components/Header';
import ImageButton from '../components/ImageButton';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { useAppSelector } from '../store';
import { BAR_HEIGHT, CLAW_OVERHANG, colors, HEADER_HEIGHT, PARCHMENT_WIDTH_RATIO, spacing } from '../theme';
import type { Tribe } from '../types';

import ambushButton from '../../assets/Images/AmbushButton.png';
import fleetButton from '../../assets/Images/FleetButton.png';
import siegeButton from '../../assets/Images/SiegeButton.png';
import background from '../../assets/Images/StoneBackground.jpg';
import mapImage from '../../assets/Images/WarPathMap.png';

type MapNavProp = NativeStackNavigationProp<RootStackParamList, 'WarTabs'>;

type TribeProgress = Pick<Tribe, 'vikingWon' | 'horseWon' | 'castleWon'>;

const { width: IMG_W, height: IMG_H } = Image.resolveAssetSource(mapImage);

const LOCATIONS = [
  { id: 'vikingFleet', image: fleetButton,  top: '8%',  left: '52%', requires: null },
  { id: 'horseBaron',  image: ambushButton, top: '42%', left: '36%', requires: 'vikingWon' as keyof TribeProgress },
  { id: 'castle',      image: siegeButton,  top: '68%', left: '52%', requires: 'horseWon' as keyof TribeProgress },
] as const;

export default function MapScreen() {
  const navigation = useNavigation<MapNavProp>();
  const { user } = useAuth();
  const { width: screenWidth } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [progress, setProgress] = useState<TribeProgress | null>(null);

  const tribeId = useAppSelector((s) => s.tribe.activeTribeId);

  const mapWidth = screenWidth * PARCHMENT_WIDTH_RATIO;
  const mapHeight = mapWidth * (IMG_H / IMG_W);

  const scrollContentStyle = useMemo(() => ({
    alignItems: 'center' as const,
    paddingTop: insets.top + HEADER_HEIGHT + spacing.md,
    paddingBottom: insets.bottom + BAR_HEIGHT + CLAW_OVERHANG,
  }), [insets.top, insets.bottom]);

  useEffect(() => {
    if (!user || !tribeId) return;
    const ref = doc(db, 'users', user.uid, 'tribes', tribeId);
    return onSnapshot(ref, (snap) => {
      if (snap.exists()) setProgress(snap.data() as TribeProgress);
    });
  }, [user, tribeId]);

  function isAvailable(requires: keyof TribeProgress | null): boolean {
    if (requires === null) return true;
    return progress?.[requires] === true;
  }

  return (
    <ImageBackground source={background} style={styles.background} resizeMode="cover">
      <SafeAreaView style={styles.safeArea} edges={[]}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={scrollContentStyle}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View style={[styles.mapFrame, { width: mapWidth, height: mapHeight }]}>
            <Image source={mapImage} style={styles.mapImage} resizeMode="stretch" />

            {LOCATIONS.map((loc) => (
              <ImageButton
                key={loc.id}
                source={loc.image}
                available={isAvailable(loc.requires)}
                onPress={() => {
                  if (tribeId) {
                    navigation.navigate('Battle', { tribeId, locationId: loc.id });
                  }
                }}
                style={{ top: loc.top, left: loc.left }}
              />
            ))}
          </View>
        </ScrollView>

        <View style={styles.headerOverlay} pointerEvents="none">
          <Header title="BATTLE PLAN" />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  safeArea: { flex: 1 },
  scroll: { flex: 1 },
  mapFrame: {
    borderWidth: 4,
    borderColor: colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  headerOverlay: { position: 'absolute', top: 0, left: 0, right: 0 },
});
