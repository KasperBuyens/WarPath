import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as ScreenOrientation from 'expo-screen-orientation';
import { doc, onSnapshot } from 'firebase/firestore';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import background from '../../assets/Images/StoneBackground.jpg';
import Button from '../components/Button';
import Divider from '../components/Divider';
import Parchment from '../components/Parchment';
import { useAuth } from '../contexts/AuthContext';
import { BATTLES } from '../data/battles';
import { getMeleeMultiplier, getRangeMultiplier } from '../data/leaders';
import { db } from '../firebase';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { battleLayout } from '../styles/battleLayout';
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
  const goingToBattleWon = useRef(false);

  useFocusEffect(useCallback(() => {
    goingToBattleWon.current = false;
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    return () => {
      if (!goingToBattleWon.current) {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
      }
    };
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

  const meleeMulti = tribe ? getMeleeMultiplier(tribe.leaderId) : 1;
  const rangeMulti = tribe ? getRangeMultiplier(tribe.leaderId) : 1;

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
    goingToBattleWon.current = true;
    navigation.replace('BattleWon', { tribeId: params.tribeId, locationId: params.locationId });
  }

  return (
    <ImageBackground source={background} style={battleLayout.background} resizeMode="cover">
      <SafeAreaView style={battleLayout.safeArea} edges={['left', 'right']}>
        <View style={[battleLayout.content, { paddingVertical: insets.top + spacing.md }]}>

          <ScrollView style={battleLayout.infoPanel} showsVerticalScrollIndicator={false} bounces={false}>
            <Parchment style={battleLayout.parchmentWrap} contentStyle={battleLayout.parchmentContent}>
              <Text style={[battleLayout.title, styles.titleCenter]}>{battle.title}</Text>
              <Text style={battleLayout.lore}>{battle.lore}</Text>

              <Divider />

              <Text style={styles.troopsHeading}>Troops needed:</Text>
              <Text style={styles.troopsRow}>Melee:  {battle.meleeCost}</Text>
              <Text style={styles.troopsRow}>Ranged: {battle.rangeCost}</Text>

              <Divider />

              <View style={styles.buttonRow}>
                <Button label="Attack!" onPress={handleAttack} style={styles.btn} textStyle={battleLayout.btnLabel} disabled={!hasEnoughTroops} />
                <Button label="Retreat" onPress={() => navigation.goBack()} style={styles.btn} textStyle={battleLayout.btnLabel} />
              </View>
            </Parchment>
          </ScrollView>

          <View style={[battleLayout.imagePanel, styles.imagePanel]}>
            <Image source={battle.image} style={battleLayout.fullImage} resizeMode="contain" />
          </View>

        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  titleCenter: { textAlign: 'center' },
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
  btn: { width: '100%' },
  imagePanel: { width: '60%' },
});
