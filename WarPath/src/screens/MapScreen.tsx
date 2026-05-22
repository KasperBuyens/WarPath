import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Image, ImageBackground, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import BottomNav from '../components/BottomNav';
import Header from '../components/Header';
import ImageButton from '../components/ImageButton';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { HEADER_HEIGHT, NAV_HEIGHT, parchmentWidth, spacing } from '../theme';
import type { Tribe } from '../types';

type MapNavProp = NativeStackNavigationProp<RootStackParamList, 'Map'>;
type MapRouteProp = RouteProp<RootStackParamList, 'Map'>;

type TribeProgress = Pick<Tribe, 'vikingWon' | 'horseWon' | 'castleWon'>;

import ambushButton from '../../assets/Images/AmbushButton.png';
import fleetButton from '../../assets/Images/FleetButton.png';
import siegeButton from '../../assets/Images/SiegeButton.png';
import background from '../../assets/Images/StoneBackground.jpg';
import mapImage from '../../assets/Images/WarPathMap.png';

const { width: IMG_W, height: IMG_H } = Image.resolveAssetSource(mapImage);
const PARCHMENT_WIDTH_RATIO = parseFloat(parchmentWidth) / 100;

const LOCATIONS = [
  { id: 'vikingFleet', image: fleetButton,  top: '8%',  left: '52%', requires: null },
  { id: 'horseBaron',  image: ambushButton, top: '42%', left: '36%', requires: 'vikingWon' as keyof TribeProgress },
  { id: 'castle',      image: siegeButton,  top: '68%', left: '52%', requires: 'horseWon' as keyof TribeProgress },
] as const;

export default function MapScreen() {
  const navigation = useNavigation<MapNavProp>();
  const { params } = useRoute<MapRouteProp>();
  const { user } = useAuth();
  const { width: screenWidth } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [progress, setProgress] = useState<TribeProgress | null>(null);

  const mapWidth = screenWidth * PARCHMENT_WIDTH_RATIO;
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
          <View style={[styles.mapFrame, { width: mapWidth, height: mapHeight }]}>
            <Image source={mapImage} style={styles.mapImage} resizeMode="stretch" />

            {LOCATIONS.map((loc) => (
              <ImageButton
                key={loc.id}
                source={loc.image}
                available={isAvailable(loc.requires)}
                onPress={() => navigation.navigate('Battle', { tribeId: params.tribeId, locationId: loc.id })}
                style={{ top: loc.top, left: loc.left }}
              />
            ))}
          </View>
        </ScrollView>

        <View style={styles.footerOverlay}>
          <BottomNav tribeId={params.tribeId} active="map" />
        </View>

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
    borderColor: '#5C5C5C',
    borderRadius: 4,
    overflow: 'hidden',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  headerOverlay: { position: 'absolute', top: 0, left: 0, right: 0 },
  footerOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0 },
});
