import { useFocusEffect, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useCallback, useEffect, useRef } from 'react';
import { Animated, Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import background from '../../assets/Images/StoneBackground.jpg';
import victoryImage from '../../assets/Images/WarVictory.png';
import Button from '../components/Button';
import Divider from '../components/Divider';
import Parchment from '../components/Parchment';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { colors, spacing, typography } from '../theme';

type VictoryNavProp = NativeStackNavigationProp<RootStackParamList, 'Victory'>;

export default function VictoryScreen() {
  const navigation = useNavigation<VictoryNavProp>();
  const insets = useSafeAreaInsets();

  const pulseAnim = useRef(new Animated.Value(0)).current;

  useFocusEffect(useCallback(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    return () => { ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT); };
  }, []));

  useEffect(() => {
    Animated.sequence([
      Animated.timing(pulseAnim, { toValue: 1, duration: 350, useNativeDriver: true }),
      Animated.timing(pulseAnim, { toValue: 0.85, duration: 200, useNativeDriver: true }),
      Animated.timing(pulseAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
      Animated.delay(700),
      Animated.timing(pulseAnim, { toValue: 0, duration: 400, useNativeDriver: true }),
    ]).start();
  }, []);

  const pulseOpacity = pulseAnim;
  const pulseScale = pulseAnim.interpolate({ inputRange: [0, 1], outputRange: [0.4, 1] });

  return (
    <ImageBackground source={background} style={styles.background} resizeMode="cover">
      <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
        <View style={[styles.content, { paddingVertical: insets.top + spacing.md }]}>

          <View style={styles.imagePanel}>
            <Image source={victoryImage} style={styles.victoryImage} resizeMode="contain" />
          </View>

          <ScrollView style={styles.infoPanel} showsVerticalScrollIndicator={false} bounces={false}>
            <Parchment style={styles.parchmentWrap} contentStyle={styles.parchmentContent}>
              <Text style={styles.title}>The War is Won!</Text>
              <Text style={styles.lore}>
                The war is won! The orcs have captured all leaders of the Human Lands.                
                {'\n\n'}
                Orc Warrios are marching through the villages near the capitol. They burn buildings and slaughter civilions, with noone to stop them.
                {'\n\n'}
                The defeated kings and barons are brought to the town square and to be executed for all to see.
                {'\n\n'}
                Knelt down, their heads will be severed from their shoulders one by one, their blood staining the grass.
                {'\n\n'}
                As a learned schollar once proclaimed: The Age of Men is over. The Time of the Orc has come
              </Text>

              <Divider />

              <Button
                label="Return to Hub"
                onPress={() => navigation.navigate('Hub')}
                textStyle={styles.btnLabel}
              />
            </Parchment>
          </ScrollView>

        </View>
      </SafeAreaView>

      <Animated.View
        style={[styles.victoryOverlay, { opacity: pulseOpacity, transform: [{ scale: pulseScale }] }]}
        pointerEvents="none"
      >
        <Text style={styles.victoryText}>VICTORY</Text>
      </Animated.View>
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
  imagePanel: {
    width: '55%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  victoryImage: {
    width: '100%',
    height: '100%',
  },
  infoPanel: {
    width: '45%',
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
  title: {
    ...typography.body,
    fontFamily: 'CaesarDressing',
    color: colors.text,
    width: '100%',
  },
  lore: {
    ...typography.small,
    color: colors.text,
    lineHeight: 18,
  },
  btnLabel: { fontSize: 13, letterSpacing: 1 },
  victoryOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  victoryText: {
    fontSize: 72,
    fontFamily: 'CaesarDressing',
    color: '#FFD700',
    letterSpacing: 12,
    textShadowColor: 'rgba(0,0,0,0.85)',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 8,
  },
});
