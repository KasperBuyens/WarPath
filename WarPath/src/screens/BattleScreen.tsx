import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as ScreenOrientation from 'expo-screen-orientation';
import { doc, onSnapshot } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import { Alert, Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import background from '../../assets/Images/StoneBackground.jpg';
import Button from '../components/Button';
import Divider from '../components/Divider';
import Parchment from '../components/Parchment';
import { useAuth } from '../contexts/AuthContext';
import { BATTLES } from '../data/battles';
import { db } from '../firebase';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { colors, spacing, typography } from '../theme';
import type { Tribe } from '../types';

type BattleNavProp = NativeStackNavigationProp<RootStackParamList, 'Battle'>;
type BattleRouteProp = RouteProp<RootStackParamList, 'Battle'>;

type TribeCounts = Pick<Tribe, 'meleeCount' | 'rangeCount' | 'leaderId'>;

export default function BattleScreen() {
  const navigation = useNavigation<BattleNavProp>();
  const { params } = useRoute<BattleRouteProp>();
  const { user } = useAuth();
  const insets = useSafeAreaInsets();
  const [tribe, setTribe] = useState<TribeCounts | null>(null);

  const battle = BATTLES[params.locationId];

  useFocusEffect(useCallback(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    return () => { ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT); };
  }, []));

  useEffect(() => {
    if (!user) return;
    const ref = doc(db, 'users', user.uid, 'tribes', params.tribeId);
    return onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setTribe({ meleeCount: data.meleeCount ?? 0, rangeCount: data.rangeCount ?? 0, leaderId: data.leaderId ?? '' });
      }
    });
  }, [user, params.tribeId]);

  const meleeMulti = tribe?.leaderId === 'melee' ? 2 : tribe?.leaderId === 'magic' ? 1.5 : 1;
  const rangeMulti = tribe?.leaderId === 'range' ? 2 : tribe?.leaderId === 'magic' ? 1.5 : 1;

  const hasEnoughTroops =
    tribe !== null &&
    tribe.meleeCount * meleeMulti >= battle.meleeCost &&
    tribe.rangeCount * rangeMulti >= battle.rangeCost;

  function handleAttack() {
    if (!hasEnoughTroops) {
      Alert.alert(
        'Not enough troops!',
        `You need ${battle.meleeCost} melee and ${battle.rangeCost} ranged.`,
      );
      return;
    }
    navigation.replace('BattleWon', { tribeId: params.tribeId, locationId: params.locationId });
  }

  return (
    <ImageBackground source={background} style={styles.background} resizeMode="cover">
      <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
        <View style={[styles.content, { paddingVertical: insets.top + spacing.md }]}>

          <ScrollView style={styles.infoPanel} showsVerticalScrollIndicator={false} bounces={false}>
            <Parchment style={styles.parchmentWrap} contentStyle={styles.parchmentContent}>
              <Text style={styles.title}>{battle.title}</Text>
              <Text style={styles.lore}>{battle.lore}</Text>

              <Divider />

              <Text style={styles.troopsHeading}>Troops needed:</Text>
              <Text style={styles.troopsRow}>Melee:  {battle.meleeCost}</Text>
              <Text style={styles.troopsRow}>Ranged: {battle.rangeCost}</Text>

              <Divider />

              <View style={styles.buttonRow}>
                <Button label="Attack!" onPress={handleAttack} style={styles.btn} textStyle={styles.btnLabel} disabled={!hasEnoughTroops} />
                <Button label="Retreat" onPress={() => navigation.goBack()} style={styles.btn} textStyle={styles.btnLabel} />
              </View>
            </Parchment>
          </ScrollView>

          <View style={styles.imagePanel}>
            <Image source={battle.image} style={styles.battleImage} resizeMode="contain" />
          </View>

        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  safeArea: { flex: 1 },
  content: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    gap: spacing.md,
  },
  infoPanel: {
    width: '40%',
  },
  parchmentWrap: {
    width: '100%',
  },
  parchmentContent: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    gap: spacing.xs,
    alignItems: 'flex-start',
  },
  imagePanel: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  battleImage: {
    width: '100%',
    height: '100%',
  },
  title: {
    ...typography.body,
    fontWeight: '700',
    color: colors.text,
    width: '100%',
    textAlign: 'center',
  },
  lore: {
    ...typography.small,
    color: colors.text,
    lineHeight: 18,
  },
  troopsHeading: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.text,
  },
  troopsRow: {
    ...typography.small,
    color: colors.text,
  },
  buttonRow: {
    width: '100%',
    gap: spacing.xs,
  },
  btn: {
    width: '100%',
  },
  btnLabel: {
    fontSize: 13,
    letterSpacing: 1,
  },
});
