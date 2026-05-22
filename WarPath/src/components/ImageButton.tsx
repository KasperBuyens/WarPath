import { Image, Pressable, StyleSheet, type ImageSourcePropType, type StyleProp, type ViewStyle } from 'react-native';

type Props = {
  source: ImageSourcePropType;
  available: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

export default function ImageButton({ source, available, onPress, style }: Props) {
  return (
    <Pressable
      onPress={available ? onPress : undefined}
      style={[styles.container, style]}
    >
      <Image source={source} style={[styles.image, !available && styles.locked]} resizeMode="contain" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  image: {
    width: 220,
    height: 220,
  },
  locked: {
    opacity: 0.5,
  },
});
