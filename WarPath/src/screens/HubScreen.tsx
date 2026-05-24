import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { signOut } from 'firebase/auth';
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import PagerView from 'react-native-pager-view';

import ActionButton from '../components/ActionButton';
import Button from '../components/Button';
import ConfirmModal from '../components/ConfirmModal';
import Divider from '../components/Divider';
import Parchment from '../components/Parchment';
import ScreenLayout from '../components/ScreenLayout';
import TribeCard from '../components/TribeCard';
import { useAuth } from '../contexts/AuthContext';
import { auth, db } from '../firebase';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { useAppDispatch } from '../store';
import { setActiveTribe } from '../store/tribeSlice';
import { colors, darkTextShadow, parchmentWidth, spacing } from '../theme';
import type { Tribe } from '../types';

type HubNavProp = NativeStackNavigationProp<RootStackParamList, 'Hub'>;

export default function HubScreen() {
  const navigation = useNavigation<HubNavProp>();
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const [tribes, setTribes] = useState<Tribe[]>([]);
  const [loading, setLoading] = useState(true);
  const [tribeToDelete, setTribeToDelete] = useState<Tribe | null>(null);

  useEffect(() => {
    if (!user) return;
    const tribesRef = collection(db, 'users', user.uid, 'tribes');
    return onSnapshot(tribesRef, (snapshot) => {
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Tribe));
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

  function handleGoToWar(tribeId: string) {
    dispatch(setActiveTribe(tribeId));
    navigation.navigate('WarTabs');
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

            <PagerView style={styles.pager} initialPage={0}>
              {tribes.map((t) => (
                <View key={t.id} style={styles.cardSlot}>
                  <TribeCard {...t} />
                  <View style={styles.actions}>
                    <ActionButton onPress={() => navigation.navigate('CreateTribe')} style={styles.sideButton}>
                      <Text style={styles.actionIcon}>＋</Text>
                    </ActionButton>
                    <Button
                      label="To War"
                      onPress={() => handleGoToWar(t.id)}
                      style={styles.warButton}
                    />
                    <ActionButton onPress={() => setTribeToDelete(t)} style={styles.sideButton}>
                      <Text style={styles.actionIcon}>🗑</Text>
                    </ActionButton>
                  </View>
                </View>
              ))}
              <View key="logout" style={[styles.cardSlot, styles.homeSlot]}>
                <Parchment style={styles.homeCard}>
                  <Text style={styles.emptyText}>Return to Login</Text>
                  <Text style={styles.emptySubText}>Abandon thy warbands for now.</Text>
                  <Divider />
                  <Button label="Logout" onPress={handleLogout} />
                </Parchment>
              </View>
            </PagerView>

            {tribeToDelete && (
              <ConfirmModal
                visible
                tribeName={tribeToDelete.name}
                onCancel={() => setTribeToDelete(null)}
                onConfirm={() => { handleDelete(tribeToDelete.id); setTribeToDelete(null); }}
              />
            )}
          </View>
        )}
      </View>
    </ScreenLayout>
  );
}

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
    flex: 1,
    width: '100%',
    alignItems: 'center',
    gap: spacing.sm,
  },
  pager: {
    alignSelf: 'stretch',
    marginHorizontal: -spacing.md,
    flex: 1,
  },
  cardSlot: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    gap: spacing.sm,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
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
