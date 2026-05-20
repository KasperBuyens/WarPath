import { ImageBackground, StyleSheet, type ViewStyle } from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';

import Header from './Header';

const background = require('../../assets/Images/StoneBackground.jpg');

type ScreenLayoutProps = {
  title: string;
  children: React.ReactNode;
  edges?: Edge[];
  style?: ViewStyle;
};

export default function ScreenLayout({
  title,
  children,
  edges = ['bottom'],
  style,
}: ScreenLayoutProps) {
  return (
    <ImageBackground source={background} style={styles.background} resizeMode="cover">
      <SafeAreaView style={[styles.safeArea, style]} edges={edges}>
        <Header title={title} />
        {children}
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
});
