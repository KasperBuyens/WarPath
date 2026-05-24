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

import Button from '../components/Button';
import Divider from '../components/Divider';
import Header from '../components/Header';
import OOC from '../components/OOC';
import Parchment from '../components/Parchment';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { colors, HEADER_HEIGHT, spacing, typography } from '../theme';

import background from '../../assets/Images/StoneBackground.jpg';

type AboutNavProp = NativeStackNavigationProp<RootStackParamList, 'About'>;

export default function AboutScreen() {
  const navigation = useNavigation<AboutNavProp>();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.screen}>
    <ImageBackground source={background} style={styles.background} resizeMode="cover">
      <SafeAreaView style={styles.safeArea} edges={['bottom']}>
        <ScrollView
          contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + HEADER_HEIGHT + spacing.sm }]}
          showsVerticalScrollIndicator={false}
        >
          <Parchment style={styles.parchment}>
            <Text style={styles.pageTitle}>About</Text>

            <Divider />

            <OOC>
              {"\"Warpath\""} is a school project for the subject {"\"Mobile\""}.
            </OOC>

            <Text style={styles.parchmentText}>
              {'\n'}
              To war! The orcs hunger to conquer the human lands and rule over the Realm of Legarion!
              {'\n\n'}
              Raise thy warband, choose thy warlord wisely, and train thy troops for the battles ahead.
              {'\n\n'}
              When thine army be ready, explore the map and wage three battles to secure dominion over the lands.
              {'\n\n'}
              For each battle thou shalt need troops, train them by forging swords and readying thine archers.
              {'\n\n'}
              Once thou hast defeated the Viking fleet, ambushed the Horse Baron, and sieged the King{"'"}s Castle, thou mayest claim rule over the Human lands!

            </Text>

            <Text style={styles.sectionTitle}>Credits</Text>
            <Text style={styles.allOther}>All images featuring lego were made by Kasper Buyens making use of his own private lego collection.</Text>

            <Text style={styles.sectionTitle}>Disclaimer</Text>
            <OOC>
              LEGO®, the LEGO® logo, the Minifigure, and the Brick and Knob configurations are trademarks
              of the LEGO® Group of Companies.
              {'\n\n'}
              This website is in no way, shape or form sponsored, authorized or endorsed by the LEGO® group.
              {'\n\n'}
              It is a fan page, written by a fan of the company and product who has no affiliation to the company.
              {'\n\n'}
              My website follows LEGO®{"'"}s notices and policies concerning fair play and proper use of the
              LEGO® trademark and brand, see{' '}
              <Text
                style={styles.link}
                onPress={() => Linking.openURL('https://www.lego.com/en-be/legal/notices-and-policies/fair-play/')}
              >
                this link
              </Text>
              .
            </OOC>

            <View style={styles.backWrap}>
              <Divider />
              <Button label="Go Back" onPress={() => navigation.goBack()} compact />
            </View>
          </Parchment>
        </ScrollView>

        <View style={styles.headerOverlay} pointerEvents="none">
          <Header title="WARPATH" />
        </View>
      </SafeAreaView>
    </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
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
    marginBottom: spacing.xs,
  },
  parchmentText: {
    ...typography.body,
    width: '100%',
    color: colors.text,
  },
  sectionTitle: {
    width: '100%',
    fontSize: 22,
    fontFamily: 'CaesarDressing',
    color: colors.primary,
    letterSpacing: 1,
    marginTop: 18,
    marginBottom: spacing.xs,
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
  backWrap: {
    width: '100%',
    marginTop: spacing.sm,
    gap: spacing.xs,
  },
});
