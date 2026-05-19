import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '../components/Button';
import Divider from '../components/Divider';
import Header from '../components/Header';
import Parchment from '../components/Parchment';
import type { RootStackParamList } from '../navigation/RootNavigator';

const background = require('../../assets/Images/StoneBackground.jpg');

type HomeNavProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeNavProp>();

  return (
    <ImageBackground source={background} style={styles.background} resizeMode="cover">
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <Header title="WARPATH" />

        <View style={styles.body}>
          <Parchment style={styles.parchment}>
            <View style={styles.buttons}>
              <Button label="Login" onPress={() => navigation.navigate('Login')} />
              <Divider />
              <Button label="Register" onPress={() => navigation.navigate('Register')} />
              <Divider />
              <Button label="About" onPress={() => navigation.navigate('About')} />
            </View>
          </Parchment>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  parchment: {
    width: '85%',
    alignSelf: 'center',
  },
  buttons: {
    width: '100%',
    gap: 14,
    alignItems: 'stretch',
  },
});
