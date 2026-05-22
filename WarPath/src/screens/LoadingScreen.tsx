import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { signOut } from 'firebase/auth';
import { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { auth } from '../firebase';
import type { RootStackParamList } from '../navigation/RootNavigator';

import loadingImage from '../../assets/Images/LoadingScreen.png';

type LoadingNavProp = NativeStackNavigationProp<RootStackParamList, 'Loading'>;

export default function LoadingScreen() {
  const navigation = useNavigation<LoadingNavProp>();

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    signOut(auth).finally(() => {
      timer = setTimeout(() => navigation.replace('Home'), 2000);
    });
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={loadingImage} style={styles.image} resizeMode="cover" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
