import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { addDoc, collection } from 'firebase/firestore';
import { Formik } from 'formik';
import { useRef, useState } from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  PanResponder,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Yup from 'yup';

import Button from '../components/Button';
import Divider from '../components/Divider';
import Header from '../components/Header';
import Parchment from '../components/Parchment';
import ParchmentInput from '../components/ParchmentInput';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { colors, spacing, parchmentWidth } from '../theme';

const background = require('../../assets/Images/StoneBackground.jpg');

type CreateTribeNavProp = NativeStackNavigationProp<RootStackParamList, 'CreateTribe'>;

const HEADER_HEIGHT = 130;

const LEADERS = [
  {
    id: 'melee',
    bonus: '2× Melee Power',
    description: 'Your sword-bearers strike twice as hard.',
    image: require('../../assets/Images/MeleeLeader.png'),
  },
  {
    id: 'range',
    bonus: '2× Range Power',
    description: 'Your archers loose arrows with deadly precision.',
    image: require('../../assets/Images/RangeLeader.png'),
  },
  {
    id: 'magic',
    bonus: '1.5× All Power',
    description: 'All warriors fight with greater ferocity.',
    image: require('../../assets/Images/MagicLeader.png'),
  },
];

const schema = Yup.object({
  tribeName: Yup.string().required('Tribe name is required').min(2, 'At least 2 characters'),
});

export default function CreateTribeScreen() {
  const navigation = useNavigation<CreateTribeNavProp>();
  const { user } = useAuth();
  const [leaderIndex, setLeaderIndex] = useState(0);
  const insets = useSafeAreaInsets();

  const leader = LEADERS[leaderIndex];

  const swipe = useRef(PanResponder.create({
    onMoveShouldSetPanResponder: (_, gs) =>
      Math.abs(gs.dx) > 10 && Math.abs(gs.dx) > Math.abs(gs.dy),
    onPanResponderRelease: (_, gs) => {
      if (gs.dx < -50) setLeaderIndex((i) => (i === LEADERS.length - 1 ? 0 : i + 1));
      else if (gs.dx > 50) setLeaderIndex((i) => (i === 0 ? LEADERS.length - 1 : i - 1));
    },
  })).current;

  function prevLeader() {
    setLeaderIndex((i) => (i === 0 ? LEADERS.length - 1 : i - 1));
  }

  function nextLeader() {
    setLeaderIndex((i) => (i === LEADERS.length - 1 ? 0 : i + 1));
  }

  async function handleCreate(values: { tribeName: string }) {
    if (!user) return;
    try {
      await addDoc(collection(db, 'users', user.uid, 'tribes'), {
        name: values.tribeName.trim(),
        leaderId: leader.id,
        meleeCount: 0,
        rangeCount: 0,
        vikingWon: false,
        horseWon: false,
        castleWon: false,
      });
      navigation.goBack();
    } catch (e: any) {
      Alert.alert('Failed to raise tribe', e.message);
    }
  }

  return (
    <ImageBackground source={background} style={styles.background} resizeMode="cover">
      <SafeAreaView style={styles.safeArea} edges={['bottom']}>
        <KeyboardAvoidingView
          style={styles.body}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView
            contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + HEADER_HEIGHT + 20 }]}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <Parchment style={styles.parchment}>
              <Formik
                initialValues={{ tribeName: '' }}
                validationSchema={schema}
                onSubmit={handleCreate}
              >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
                  <View style={styles.form}>
                    <ParchmentInput
                      placeholder="Enter Tribe Name"
                      value={values.tribeName}
                      onChangeText={handleChange('tribeName')}
                      onBlur={handleBlur('tribeName')}
                    />
                    {touched.tribeName && errors.tribeName && (
                      <Text style={styles.error}>{errors.tribeName}</Text>
                    )}

                    <Divider />

                    <Text style={styles.chooseLabel}>Choose thy Warlord</Text>

                    <View style={styles.carousel} {...swipe.panHandlers}>
                      <Pressable onPress={prevLeader} style={styles.arrow}>
                        <Text style={styles.arrowText}>‹</Text>
                      </Pressable>

                      <View style={styles.leaderImageBorder}>
                        <Image
                          source={leader.image}
                          style={styles.leaderImage}
                          resizeMode="contain"
                        />
                      </View>

                      <Pressable onPress={nextLeader} style={styles.arrow}>
                        <Text style={styles.arrowText}>›</Text>
                      </Pressable>
                    </View>

                    <Text style={styles.leaderBonus}>{leader.bonus}</Text>
                    <Text style={styles.leaderDesc}>{leader.description}</Text>

                    <Divider />

                    <Button
                      label="Raise"
                      onPress={() => handleSubmit()}
                      disabled={isSubmitting}
                    />
                    <Button
                      label="Abandon"
                      onPress={() => navigation.goBack()}
                    />
                  </View>
                )}
              </Formik>
            </Parchment>
          </ScrollView>
        </KeyboardAvoidingView>

        <View style={styles.headerOverlay} pointerEvents="none">
          <Header title="RAISE TRIBE" />
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
  body: {
    flex: 1,
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
    alignItems: 'center',
  },
  parchment: {
    width: parchmentWidth,
    alignSelf: 'center',
  },
  form: {
    width: '100%',
    gap: spacing.sm,
    alignItems: 'center',
  },
  error: {
    color: colors.error,
    fontSize: 13,
    alignSelf: 'flex-start',
    marginTop: -6,
  },
  chooseLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: 1,
  },
  carousel: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    gap: 4,
  },
  arrow: {
    padding: spacing.xs,
  },
  arrowText: {
    fontSize: 48,
    color: colors.primary,
    lineHeight: 52,
  },
  leaderImageBorder: {
    borderWidth: 3,
    borderColor: colors.secondaryDark,
    borderRadius: 4,
    backgroundColor: '#C8C4BF',
  },
  leaderImage: {
    width: 180,
    height: 180,
  },
  leaderBonus: {
    fontSize: 14,
    color: colors.secondary,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  leaderDesc: {
    fontSize: 13,
    color: colors.text,
    textAlign: 'center',
    marginTop: -4,
  },
});
