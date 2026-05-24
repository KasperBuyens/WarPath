import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { useAuth } from '../contexts/AuthContext';
import type { RootStackParamList } from '../navigation/RootNavigator';

import loadingImage from '../../assets/Images/LoadingScreen.png';

type LoadingNavProp = NativeStackNavigationProp<RootStackParamList, 'Loading'>;

export default function LoadingScreen() {
  const navigation = useNavigation<LoadingNavProp>();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    const timer = setTimeout(() => {
      navigation.replace(user ? 'Hub' : 'Home');
    }, 2000);
    return () => clearTimeout(timer);
  }, [loading, user, navigation]);

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
