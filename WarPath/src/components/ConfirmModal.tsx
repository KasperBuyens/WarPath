import { Modal, StyleSheet, Text, View } from 'react-native';

import { colors, spacing } from '../theme';
import Button from './Button';
import Divider from './Divider';
import Parchment from './Parchment';

type Props = {
  visible: boolean;
  tribeName: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({ visible, tribeName, onConfirm, onCancel }: Props) {
  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onCancel}>
      <View style={styles.overlay}>
        <Parchment style={styles.card}>
          <Text style={styles.title}>Abandon Tribe</Text>
          <Divider />
          <Text style={styles.body}>
            Dost thou truly wish to disband{'\n'}
            <Text style={styles.tribeName}>{'"'}{tribeName}{'"'}</Text>
            {'\n'}Thy warriors shall fall in battle, their glory lost forever.
          </Text>
          <Divider />
          <View style={styles.buttons}>
            <Button label="Nay" onPress={onCancel} style={styles.cancelBtn} textStyle={styles.btnText} />
            <Button label="Aye" onPress={onConfirm} style={styles.confirmBtn} textStyle={styles.btnText} />
          </View>
        </Parchment>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.md,
  },
  card: {
    width: '100%',
  },
  title: {
    fontSize: 26,
    fontFamily: 'CaesarDressing',
    color: colors.primary,
    textAlign: 'center',
    letterSpacing: 2,
  },
  body: {
    fontSize: 15,
    color: colors.text,
    textAlign: 'center',
    lineHeight: 24,
  },
  tribeName: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.primary,
  },
  buttons: {
    flexDirection: 'row',
    gap: spacing.sm,
    width: '100%',
  },
  cancelBtn: {
    flex: 1,
  },
  confirmBtn: {
    flex: 1,
  },
  btnText: {
    fontSize: 16,
  },
});
