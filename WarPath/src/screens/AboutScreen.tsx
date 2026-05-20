import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useRef } from 'react';
import {
  ImageBackground,
  Linking,
  PanResponder,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import Divider from '../components/Divider';
import Header from '../components/Header';
import OOC from '../components/OOC';
import Parchment from '../components/Parchment';
import type { RootStackParamList } from '../navigation/RootNavigator';

const background = require('../../assets/Images/StoneBackground.jpg');

type AboutNavProp = NativeStackNavigationProp<RootStackParamList, 'About'>;

const HEADER_HEIGHT = 130;

export default function AboutScreen() {
  const navigation = useNavigation<AboutNavProp>();
  const insets = useSafeAreaInsets();

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gs) =>
        Math.abs(gs.dx) > 10 && Math.abs(gs.dx) > Math.abs(gs.dy),
      onPanResponderRelease: (_, gs) => {
        if (Math.abs(gs.dx) > 50) {
          navigation.goBack();
        }
      },
    })
  ).current;

  return (
    <ImageBackground source={background} style={styles.background} resizeMode="cover">
      <SafeAreaView style={styles.safeArea} edges={['bottom']}>
        <ScrollView
          contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + HEADER_HEIGHT + 20 }]}
          showsVerticalScrollIndicator={false}
          {...panResponder.panHandlers}
        >
          <Parchment style={styles.parchment}>
            <Text style={styles.pageTitle}>About</Text>

            <Divider symbol="⚔" />

            <OOC>
              &quot;Warpath&quot; is a school project for the subject &quot;Mobile&quot;.
            </OOC>

            <Text style={styles.parchmentText}>
              {'\n'}
              To war! The orcs hunger to conquer the human lands and rule over the Realm of Legarion!
              {'\n\n'}
              Raise thy warband, choose thy warlord wisely, and train thy troops for the battles ahead.
              {'\n\n'}
              When thine army be ready, descend upon the Realm and charge into battle! Defeat the Viking Fleet, capture the Horse Baron, and storm the King&apos;s Castle.
              {'\n\n'}
              As a learned scholar once proclaimed: the Age of Men is over. The Time of the Orc has come.
            </Text>

            <Text style={styles.sectionTitle}>Credits</Text>
            <Text style={styles.parchmentText}>INSERT CREDITS HERE</Text>
            <Text style={styles.allOther}>All other images made by Kasper Buyens</Text>

            <Text style={styles.sectionTitle}>Disclaimer</Text>
            <OOC>
              LEGO®, the LEGO® logo, the Minifigure, and the Brick and Knob configurations are trademarks of the LEGO® Group of Companies.
              {'\n\n'}
              This website is in no way, shape or form sponsored, authorized or endorsed by the LEGO® group.
              {'\n\n'}
              It is a fan page, written by a fan of the company and product who has no affiliation to the company.
              {'\n\n'}
              My website follows LEGO®&apos;s notices and policies concerning fair play and propper use of the LEGO® trademark and brand, see{' '}
              <Text
                style={styles.link}
                onPress={() =>
                  Linking.openURL(
                    'https://www.lego.com/en-be/legal/notices-and-policies/fair-play/',
                  )
                }
              >
                this link
              </Text>
              .
            </OOC>

            <View style={styles.swipeWrap}>
              <Divider />
              <Text style={styles.swipeHint}>← Swipe to go back →</Text>
            </View>
          </Parchment>
        </ScrollView>

        <View style={styles.headerOverlay} pointerEvents="none">
          <Header title="WARPATH" />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  parchment: {
    width: '100%',
    alignSelf: 'center',
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#5A0E12',
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 8,
  },
  parchmentText: {
    width: '100%',
    fontSize: 17,
    lineHeight: 25,
    color: '#31221e',
    textAlign: 'left',
  },
  sectionTitle: {
    width: '100%',
    fontSize: 22,
    fontWeight: '700',
    color: '#5A0E12',
    letterSpacing: 1,
    marginTop: 18,
    marginBottom: 8,
  },
  allOther: {
    width: '100%',
    fontSize: 14,
    color: '#31221e',
    marginTop: 6,
  },
  link: {
    color: '#5A0E12',
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
  swipeWrap: {
    width: '100%',
    marginTop: 16,
    alignItems: 'center',
    gap: 8,
  },
  swipeHint: {
    color: '#8B5A3C',
    fontSize: 14,
    letterSpacing: 1,
  },
});
