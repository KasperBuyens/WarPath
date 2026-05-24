import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { signOut } from 'firebase/auth';
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';

import Button from '../components/Button';
import ConfirmModal from '../components/ConfirmModal';
import Divider from '../components/Divider';
import Parchment from '../components/Parchment';
import ScreenLayout from '../components/ScreenLayout';
import TribeCard from '../components/TribeCard';
import { useAuth } from '../contexts/AuthContext';
import { auth, db } from '../firebase';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { useSlideSwipe } from '../hooks/useSlideSwipe';
import { colors, parchmentWidth, spacing, darkTextShadow } from '../theme';
import type { Tribe } from '../types';

type HubNavProp = NativeStackNavigationProp<RootStackParamList, 'Hub'>;

const LIFT = 5;

export default function HubScreen() {
  const navigation = useNavigation<HubNavProp>();
  const { user } = useAuth();
  const [tribes, setTribes] = useState<Tribe[]>([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const tribesLengthRef = useRef(0);
  const { width: screenWidth } = useWindowDimensions();
  const { slideAnim, panHandlers } = useSlideSwipe({
    screenWidth,
    countRef: tribesLengthRef,
    wrap: false,
    onIndexChange: setIndex,
  });

  useEffect(() => {
    if (!user) return;
    const tribesRef = collection(db, 'users', user.uid, 'tribes');
    return onSnapshot(tribesRef, (snapshot) => {
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Tribe));
      tribesLengthRef.current = data.length + 1;
      setTribes(data);
      setLoading(false);
    });
  }, [user]);

  async function handleLogout() {
    await signOut(auth);
    navigation.replace('Home');
  }

  async function handleDelete(tribeId: string) {
    if (!user) return;
    await deleteDoc(doc(db, 'users', user.uid, 'tribes', tribeId));
  }

  if (loading) {
    return (
      <ScreenLayout title="SELECT TRIBE">
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </ScreenLayout>
    );
  }

  const tribe = tribes[Math.min(index, tribes.length - 1)];

  return (
    <ScreenLayout title="SELECT TRIBE">
      <View style={styles.body}>
        {tribes.length === 0 ? (
          <Parchment style={styles.emptyCard}>
            <Text style={styles.emptyText}>No tribes yet.</Text>
            <Text style={styles.emptySubText}>Raise thy first warband to begin.</Text>
            <Divider />
            <Button label="Raise Tribe" onPress={() => navigation.navigate('CreateTribe')} />
            <Divider />
            <Button label="Logout" onPress={handleLogout} compact />
          </Parchment>
        ) : (
          <View style={styles.content}>
            <Text style={styles.swipeHint}>← Swipe to cycle thy warbands →</Text>

            <View style={styles.cardViewport}>
              <Animated.View
                style={[styles.cardRow, { width: screenWidth * (tribes.length + 1), transform: [{ translateX: slideAnim }] }]}
                {...panHandlers}
              >
                {tribes.map((t) => (
                  <View key={t.id} style={[styles.cardSlot, { width: screenWidth }]}>
                    <TribeCard {...t} />
                  </View>
                ))}
                <View style={[styles.cardSlot, styles.homeSlot, { width: screenWidth }]}>
                  <Parchment style={styles.homeCard}>
                    <Text style={styles.emptyText}>Return to Login</Text>
                    <Text style={styles.emptySubText}>Abandon thy warbands for now.</Text>
                    <Divider />
                    <Button label="Logout" onPress={handleLogout} />
                  </Parchment>
                </View>
              </Animated.View>
            </View>

            {index < tribes.length && <View style={styles.actions}>
              <ActionButton onPress={() => navigation.navigate('CreateTribe')} style={styles.sideButton}>
                <Text style={styles.actionIcon}>＋</Text>
              </ActionButton>
              <Button
                label="To War"
                onPress={() => navigation.navigate('Map', { tribeId: tribe.id })}
                style={styles.warButton}
              />
              <ActionButton onPress={() => setShowConfirm(true)} style={styles.sideButton}>
                <Text style={styles.actionIcon}>🗑</Text>
              </ActionButton>
            </View>}

            <ConfirmModal
              visible={showConfirm}
              tribeName={tribe.name}
              onCancel={() => setShowConfirm(false)}
              onConfirm={() => { setShowConfirm(false); handleDelete(tribe.id); }}
            />
          </View>
        )}
      </View>
    </ScreenLayout>
  );
}

function ActionButton({
  onPress,
  style,
  children,
}: {
  onPress: () => void;
  style?: object;
  children: React.ReactNode;
}) {
  return (
    <View style={[btnStyles.wrapper, style]}>
      <View style={btnStyles.base} />
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [btnStyles.btn, pressed && btnStyles.pressed]}
      >
        {children}
      </Pressable>
    </View>
  );
}

const btnStyles = StyleSheet.create({
  wrapper: { position: 'relative' },
  base: {
    position: 'absolute',
    top: LIFT, left: 0, right: 0, bottom: 0,
    backgroundColor: colors.primaryDark,
    borderRadius: 6,
  },
  btn: {
    backgroundColor: colors.primary,
    borderWidth: 3,
    borderColor: colors.primaryDark,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginBottom: LIFT,
  },
  pressed: { transform: [{ translateY: LIFT }], marginBottom: 0 },
});

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    paddingTop: spacing.sm,
  },
  content: {
    width: '100%',
    alignItems: 'center',
    gap: 0,
  },
  cardViewport: {
    alignSelf: 'stretch',
    marginHorizontal: -spacing.md,
    overflow: 'hidden',
  },
  cardRow: {
    flexDirection: 'row',
  },
  cardSlot: {
    paddingHorizontal: spacing.md,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm,
    width: '100%',
  },
  sideButton: { flex: 1 },
  warButton: { flex: 3 },
  actionIcon: {
    fontSize: 22,
    color: colors.textLight,
  },

  swipeHint: {
    ...darkTextShadow,
    color: colors.textLight,
    fontSize: 16,
    fontStyle: 'italic',
    letterSpacing: 1,
    marginTop: -55,
    marginBottom: spacing.sm,
  },
  homeSlot: {
    justifyContent: 'center',
  },
  homeCard: {
    width: '100%',
  },
  emptyCard: {
    width: parchmentWidth,
    alignItems: 'center',
    gap: spacing.sm,
  },
  emptyText: {
    fontSize: 20,
    fontFamily: 'CaesarDressing',
    color: colors.primary,
  },
  emptySubText: {
    fontSize: 14,
    color: colors.text,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
