import { useFocusEffect, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useCallback } from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import background from '../../assets/Images/StoneBackground.jpg';
import toothBig from '../../assets/Images/ToothBig.png';
import toothSmall from '../../assets/Images/ToothSmall.png';
import Button from '../components/Button';
import Parchment from '../components/Parchment';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { colors, spacing, typography } from '../theme';

type VictoryNavProp = NativeStackNavigationProp<RootStackParamList, 'Victory'>;

export default function VictoryScreen() {
  const navigation = useNavigation<VictoryNavProp>();
  const insets = useSafeAreaInsets();

  useFocusEffect(useCallback(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    return () => { ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT); };
  }, []));

  return (
    <ImageBackground source={background} style={styles.background} resizeMode="cover">
      <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
        <View style={[styles.frame, { marginVertical: insets.top + spacing.sm }]}>

          <View style={styles.header}>
            <Text style={styles.headerText}>War Won!</Text>
          </View>

          <View style={styles.content}>
            <Image source={toothBig} style={[styles.tooth, styles.topLeft]} resizeMode="contain" />
            <Image source={toothBig} style={[styles.tooth, styles.topRight]} resizeMode="contain" />
            <Image source={toothSmall} style={[styles.tooth, styles.bottomLeft]} resizeMode="contain" />
            <Image source={toothSmall} style={[styles.tooth, styles.bottomRight]} resizeMode="contain" />

            <Parchment style={styles.parchment} contentStyle={styles.parchmentContent}>
              <Text style={styles.title}>The War is won!</Text>
              <Text style={styles.lore}>
                The orcs have conquered the entirety of the Realm of Legarion
              </Text>
            </Parchment>
          </View>

          <View style={styles.footer}>
            <Button
              label="Return to Hub"
              onPress={() => navigation.navigate('Hub')}
              style={styles.btn}
              textStyle={styles.btnLabel}
            />
          </View>

        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const TOOTH_SIZE = 90;

const styles = StyleSheet.create({
  background: { flex: 1 },
  safeArea: { flex: 1, justifyContent: 'center' },
  frame: {
    marginHorizontal: spacing.md,
    borderWidth: 3,
    borderColor: colors.primaryDark,
    overflow: 'hidden',
  },
  header: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: colors.primaryDark,
  },
  headerText: {
    ...typography.title,
    color: colors.textLight,
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.md,
  },
  tooth: {
    position: 'absolute',
    width: TOOTH_SIZE,
    height: TOOTH_SIZE,
  },
  topLeft: { top: 0, left: 0 },
  topRight: { top: 0, right: 0, transform: [{ scaleX: -1 }] },
  bottomLeft: { bottom: 0, left: 0, transform: [{ scaleY: -1 }] },
  bottomRight: { bottom: 0, right: 0, transform: [{ scaleX: -1 }, { scaleY: -1 }] },
  parchment: { width: '70%' },
  parchmentContent: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    gap: spacing.xs,
    alignItems: 'center',
  },
  footer: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
  },
  btn: { width: '100%' },
  btnLabel: { fontSize: 13, letterSpacing: 1 },
  title: {
    ...typography.body,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
  lore: {
    ...typography.small,
    color: colors.text,
    textAlign: 'center',
    lineHeight: 18,
  },
});
