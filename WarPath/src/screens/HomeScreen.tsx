import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';

import Button from '../components/Button';
import Divider from '../components/Divider';
import Parchment from '../components/Parchment';
import ScreenLayout from '../components/ScreenLayout';
import { useSwipeNavigation } from '../hooks/useSwipeNavigation';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { colors, spacing, parchmentWidth } from '../theme';

type HomeNavProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeNavProp>();
  const swipe = useSwipeNavigation(() => navigation.navigate('About'));

  return (
    <ScreenLayout title="WARPATH">
      <View style={styles.body} {...swipe.panHandlers}>
        <Parchment style={styles.parchment}>
          <View style={styles.buttons}>
            <Button label="Login" onPress={() => navigation.navigate('Login')} />
            <Divider />
            <Button label="Register" onPress={() => navigation.navigate('Register')} />
            <Divider />
            <Text style={styles.swipeHint}>← Swipe for more info →</Text>
          </View>
        </Parchment>
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  parchment: {
    width: parchmentWidth,
    alignSelf: 'center',
  },
  buttons: {
    width: '100%',
    gap: spacing.sm,
    alignItems: 'stretch',
  },
  swipeHint: {
    color: colors.secondary,
    fontSize: 14,
    letterSpacing: 1,
    textAlign: 'center',
  },
});
