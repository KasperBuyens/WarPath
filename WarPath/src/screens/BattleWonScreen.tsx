import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as ScreenOrientation from 'expo-screen-orientation';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import { Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
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

type BattleWonNavProp = NativeStackNavigationProp<RootStackParamList, 'BattleWon'>;
type BattleWonRouteProp = RouteProp<RootStackParamList, 'BattleWon'>;

export default function BattleWonScreen() {
  const navigation = useNavigation<BattleWonNavProp>();
  const { params } = useRoute<BattleWonRouteProp>();
  const { user } = useAuth();
  const insets = useSafeAreaInsets();

  const battle = BATTLES[params.locationId];
  const [losses, setLosses] = useState<{ melee: number; range: number } | null>(null);

  useFocusEffect(useCallback(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    return () => { ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT); };
  }, []));

  useEffect(() => {
    if (!user) return;
    const ref = doc(db, 'users', user.uid, 'tribes', params.tribeId);
    const applyResult = async () => {
      const snap = await getDoc(ref);
      if (!snap.exists()) return;
      const data = snap.data();
      const leaderId = data.leaderId as string | undefined;
      const meleeMulti = leaderId === 'melee' ? 0.5 : leaderId === 'magic' ? 0.75 : 1;
      const rangeMulti = leaderId === 'range' ? 0.5 : leaderId === 'magic' ? 0.75 : 1;
      const meleeLoss = Math.round((Math.floor(Math.random() * (battle.meleeCost - 5 + 1)) + 5) * meleeMulti);
      const rangeLoss = Math.round((Math.floor(Math.random() * (battle.rangeCost - 5 + 1)) + 5) * rangeMulti);
      setLosses({ melee: meleeLoss, range: rangeLoss });
      await setDoc(ref, {
        [battle.wonField]: true,
        meleeCount: Math.max(0, (data.meleeCount ?? 0) - meleeLoss),
        rangeCount: Math.max(0, (data.rangeCount ?? 0) - rangeLoss),
      }, { merge: true });
    };
    applyResult();
  }, [user, params.tribeId, battle.wonField]);

  return (
    <ImageBackground source={background} style={styles.background} resizeMode="cover">
      <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
        <View style={[styles.content, { paddingVertical: insets.top + spacing.md }]}>

          <ScrollView style={styles.infoPanel} showsVerticalScrollIndicator={false} bounces={false}>
            <Parchment style={styles.parchmentWrap} contentStyle={styles.parchmentContent}>
              <Text style={styles.title}>{battle.victoryTitle}</Text>
              <Text style={styles.lore}>{battle.victoryLore}</Text>

              <Divider />

              <Text style={styles.lossHeading}>Fallen warriors:</Text>
              {losses ? (
                <>
                  <Text style={styles.lossRow}>Melee:  {losses.melee}</Text>
                  <Text style={styles.lossRow}>Ranged: {losses.range}</Text>
                </>
              ) : (
                <Text style={styles.lossRow}>Counting the dead...</Text>
              )}

              <Divider />

              {params.locationId === 'castle' ? (
                <Button
                  label="See the Victory!"
                  onPress={() => navigation.navigate('Victory')}
                  textStyle={styles.btnLabel}
                />
              ) : (
                <Button
                  label="Return to Map"
                  onPress={() => navigation.navigate('Map', { tribeId: params.tribeId })}
                  textStyle={styles.btnLabel}
                />
              )}
            </Parchment>
          </ScrollView>

          <View style={styles.imagePanel}>
            <Image source={battle.victoryImage} style={styles.battleImage} resizeMode="contain" />
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
  },
  lore: {
    ...typography.small,
    color: colors.text,
    lineHeight: 18,
  },
  lossHeading: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.text,
  },
  lossRow: {
    ...typography.small,
    color: colors.text,
  },
  btnLabel: {
    fontSize: 13,
    letterSpacing: 1,
  },
});
