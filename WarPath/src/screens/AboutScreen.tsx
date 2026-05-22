import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ImageBackground,
  Linking,
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
import { useSwipeNavigation } from '../hooks/useSwipeNavigation';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { colors, HEADER_HEIGHT, spacing, typography } from '../theme';

import background from '../../assets/Images/StoneBackground.jpg';

type AboutNavProp = NativeStackNavigationProp<RootStackParamList, 'About'>;

export default function AboutScreen() {
  const navigation = useNavigation<AboutNavProp>();
  const insets = useSafeAreaInsets();
  const swipe = useSwipeNavigation(() => navigation.goBack());

  return (
    <ImageBackground source={background} style={styles.background} resizeMode="cover">
      <SafeAreaView style={styles.safeArea} edges={['bottom']}>
        <ScrollView
          contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + HEADER_HEIGHT + spacing.sm }]}
          showsVerticalScrollIndicator={false}
          {...swipe.panHandlers}
        >
          <Parchment style={styles.parchment}>
            <Text style={styles.pageTitle}>About</Text>

            <Divider />

            <OOC>
              &quot;Warpath&quot; is a school project for the subject &quot;Mobile&quot;.
            </OOC>

            <Text style={styles.parchmentText}>
              {'\n'}
              To war! The orcs hunger to conquer the human lands and rule over the Realm of Legarion!
              {'\n\n'}
              Raise thy warband, choose thy warlord wisely, and train thy troops for the battles ahead.
              {'\n\n'}
              When thine army be ready, descend upon the Realm and charge into battle! Defeat the Viking Fleet,
              capture the Horse Baron, and storm the King&apos;s Castle.
              {'\n\n'}
              As a learned scholar once proclaimed: the Age of Men is over. The Time of the Orc has come.
            </Text>

            <Text style={styles.sectionTitle}>Credits</Text>
            <Text style={styles.parchmentText}>INSERT CREDITS HERE</Text>
            <Text style={styles.allOther}>All other images made by Kasper Buyens</Text>

            <Text style={styles.sectionTitle}>Disclaimer</Text>
            <OOC>
              LEGO®, the LEGO® logo, the Minifigure, and the Brick and Knob configurations are trademarks
              of the LEGO® Group of Companies.
              {'\n\n'}
              This website is in no way, shape or form sponsored, authorized or endorsed by the LEGO® group.
              {'\n\n'}
              It is a fan page, written by a fan of the company and product who has no affiliation to the company.
              {'\n\n'}
              My website follows LEGO®&apos;s notices and policies concerning fair play and proper use of the
              LEGO® trademark and brand, see{' '}
              <Text
                style={styles.link}
                onPress={() => Linking.openURL('https://www.lego.com/en-be/legal/notices-and-policies/fair-play/')}
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
  background: { flex: 1 },
  safeArea: { flex: 1 },
  headerOverlay: { position: 'absolute', top: 0, left: 0, right: 0 },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
  },
  parchment: {
    width: '100%',
    alignSelf: 'center',
  },
  pageTitle: {
    ...typography.heading,
    color: colors.primary,
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 8,
  },
  parchmentText: {
    ...typography.body,
    width: '100%',
    color: colors.text,
  },
  sectionTitle: {
    width: '100%',
    fontSize: 22,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: 1,
    marginTop: 18,
    marginBottom: 8,
  },
  allOther: {
    ...typography.caption,
    width: '100%',
    color: colors.text,
    marginTop: 6,
  },
  link: {
    color: colors.primary,
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
  swipeWrap: {
    width: '100%',
    marginTop: spacing.sm,
    alignItems: 'center',
    gap: spacing.xs,
  },
  swipeHint: {
    color: colors.secondary,
    fontSize: 14,
    letterSpacing: 1,
  },
});
