import { useFocusEffect, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { doc, increment, onSnapshot, setDoc } from 'firebase/firestore';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import BottomNav from '../components/BottomNav';
import Button from '../components/Button';
import Divider from '../components/Divider';
import Header from '../components/Header';
import Parchment from '../components/Parchment';
import { useSlideSwipe } from '../hooks/useSlideSwipe';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { colors, NAV_HEIGHT, spacing, typography } from '../theme';

import anvilImage from '../../assets/Images/Anvil.png';
import background from '../../assets/Images/StoneBackground.jpg';
import targetImage from '../../assets/Images/Target.png';

type TrainRouteProp = RouteProp<RootStackParamList, 'TrainOrcs'>;

const TARGET_SIZE = 80;

export default function TrainOrcsScreen() {
  const { params } = useRoute<TrainRouteProp>();
  const { user } = useAuth();
  const { width: screenWidth } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const [meleeCount, setMeleeCount] = useState(0);
  const [rangeCount, setRangeCount] = useState(0);
  const [sessionMelee, setSessionMelee] = useState(0);
  const [sessionArcher, setSessionArcher] = useState(0);
  const [cheatMode, setCheatMode] = useState(false);

  const panelCountRef = useRef(2);
  const { slideAnim, panHandlers } = useSlideSwipe({ screenWidth, countRef: panelCountRef });

  const anvilScale = useRef(new Animated.Value(1)).current;
  const targetPos = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const zoneWidth = useRef(0);
  const zoneHeight = useRef(0);

  const pendingMelee = useRef(0);
  const pendingArcher = useRef(0);
  const userRef = useRef(user);
  userRef.current = user;
  const tribeIdRef = useRef(params.tribeId);

  useEffect(() => {
    if (!user) return;
    const ref = doc(db, 'users', user.uid, 'tribes', params.tribeId);
    return onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setMeleeCount(data.meleeCount ?? 0);
        setRangeCount(data.rangeCount ?? 0);
      }
    });
  }, [user, params.tribeId]);

  // Flush to Firestore when leaving the screen, reset session so counts
  // don't double when returning (DB value already includes flushed taps)
  useFocusEffect(
    useCallback(() => {
      return () => {
        const currentUser = userRef.current;
        if (!currentUser) return;
        const melee = pendingMelee.current;
        const archer = pendingArcher.current;
        if (melee === 0 && archer === 0) return;
        const ref = doc(db, 'users', currentUser.uid, 'tribes', tribeIdRef.current);
        const update: Record<string, unknown> = {};
        if (melee > 0) update.meleeCount = increment(melee);
        if (archer > 0) update.rangeCount = increment(archer);
        setDoc(ref, update, { merge: true });
        pendingMelee.current = 0;
        pendingArcher.current = 0;
        setSessionMelee(0);
        setSessionArcher(0);
      };
    }, [])
  );

  function trainMelee() {
    const amount = cheatMode ? 10 : 1;
    Animated.sequence([
      Animated.timing(anvilScale, { toValue: 0.82, duration: 90, useNativeDriver: true }),
      Animated.spring(anvilScale, { toValue: 1, useNativeDriver: true, tension: 200, friction: 8 }),
    ]).start();
    pendingMelee.current += amount;
    setSessionMelee((n) => n + amount);
  }

  function trainArcher() {
    const amount = cheatMode ? 10 : 1;
    const maxX = Math.max(0, zoneWidth.current - TARGET_SIZE);
    const maxY = Math.max(0, zoneHeight.current - TARGET_SIZE);
    Animated.spring(targetPos, {
      toValue: { x: Math.random() * maxX, y: Math.random() * maxY },
      useNativeDriver: false,
      tension: 120,
      friction: 7,
    }).start();
    pendingArcher.current += amount;
    setSessionArcher((n) => n + amount);
  }

  return (
    <ImageBackground source={background} style={styles.bg} resizeMode="cover">
      <SafeAreaView style={styles.safe} edges={[]}>

        <View style={styles.viewport} {...panHandlers}>
          <Animated.View
            style={[
              styles.slidingRow,
              { width: screenWidth * 2, transform: [{ translateX: slideAnim }] },
            ]}
          >

            {/* ─── Panel 0 · Melee ─────────────────────────── */}
            <View
              style={[styles.panel, { width: screenWidth, paddingTop: insets.top + 85, paddingBottom: insets.bottom + NAV_HEIGHT + spacing.md }]}
            >
              <Parchment style={styles.parchment} contentStyle={styles.parchmentContent}>

                <Text style={[styles.bodyText, { textAlign: 'center' }]}>
                  Hammer the anvil to arm your warriors!
                </Text>

                <Text style={[styles.countText, { color: colors.won, textAlign: 'center' }]}>
                  Warriors armed: {meleeCount + sessionMelee}
                </Text>

                <Divider />

                <Pressable onPress={trainMelee} style={styles.anvilArea}>
                  <Animated.Image
                    source={anvilImage}
                    style={[styles.anvilImg, { transform: [{ scale: anvilScale }] }]}
                    resizeMode="contain"
                  />
                </Pressable>

                <Divider />

                <Text style={[styles.swipeHint, { textAlign: 'center' }]}>
                  {'<'} swipe for ranged training {'>'}
                </Text>
              </Parchment>
            </View>

            {/* ─── Panel 1 · Ranged ────────────────────────── */}
            <View
              style={[styles.panel, { width: screenWidth, paddingTop: insets.top + 85, paddingBottom: insets.bottom + NAV_HEIGHT + spacing.md }]}
            >
              <Parchment style={styles.parchment} contentStyle={styles.parchmentContent}>
                <Text style={[styles.bodyText, { textAlign: 'center' }]}>
                  Hit the target to train archers!
                </Text>

                <Text style={[styles.countText, { color: colors.won, textAlign: 'center' }]}>
                  Archers trained: {rangeCount + sessionArcher}
                </Text>

                <Divider />

                <View
                  style={styles.targetZone}
                  onLayout={(e) => {
                    zoneWidth.current = e.nativeEvent.layout.width;
                    zoneHeight.current = e.nativeEvent.layout.height;
                  }}
                >
                  <Animated.View
                    style={[styles.targetMover, targetPos.getLayout()]}
                  >
                    <Pressable onPress={trainArcher}>
                      <Image source={targetImage} style={styles.targetImg} resizeMode="contain" />
                    </Pressable>
                  </Animated.View>
                </View>

                <Divider />

                <Text style={[styles.swipeHint, { textAlign: 'center' }]}>
                  {'<'} swipe for melee training {'>'}
                </Text>
              </Parchment>
            </View>

          </Animated.View>
        </View>

        <View style={styles.footerOverlay}>
          <BottomNav tribeId={params.tribeId} active="train" />
        </View>

        <View style={styles.headerOverlay} pointerEvents="none">
          <Header title="TRAIN ORCS" />
        </View>

        <View style={[styles.cheatBtnOverlay, { bottom: insets.bottom + 60 }]}>
          <Button
            label={cheatMode ? 'Cheat x10: ON' : 'Cheat x10: OFF'}
            onPress={() => setCheatMode((v) => !v)}
            style={styles.cheatBtn}
            textStyle={styles.cheatBtnLabel}
            compact
            noLift
          />
        </View>

      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  safe: { flex: 1 },
  viewport: { flex: 1, overflow: 'hidden' },
  slidingRow: { flex: 1, flexDirection: 'row' },
  parchment: { width: '100%', marginTop: 40 },
  parchmentContent: { paddingTop: 16, paddingBottom: 16, paddingHorizontal: spacing.xs, gap: 2 },
  panel: {
    flex: 1,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    gap: spacing.sm,
    justifyContent: 'center',
    paddingTop: 40,
  },
  anvilArea: {
    width: '100%',
    height: 185,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyText: {
    ...typography.body,
    fontSize: 15,
    width: '100%',
    color: colors.text,
  },
  anvilImg: { width: 185, height: 185 },
  targetZone: {
    width: '100%',
    height: 185,
    overflow: 'hidden',
  },
  targetMover: { position: 'absolute' },
  targetImg: { width: TARGET_SIZE, height: TARGET_SIZE },
  countText: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },
  swipeHint: {
    color: colors.secondary,
    fontSize: 12,
    letterSpacing: 1,
    marginBottom: 12,
  },
  headerOverlay: { position: 'absolute', top: 0, left: 0, right: 0 },
  footerOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0 },
  cheatBtnOverlay: { position: 'absolute', left: 0, right: 0, alignItems: 'center' },
  cheatBtn: { width: '50%', opacity: 0.45 },
  cheatBtnLabel: { fontSize: 11, letterSpacing: 1 },
});
