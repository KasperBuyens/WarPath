import { StyleSheet } from 'react-native';

import { colors, spacing, typography } from '../theme';

export const battleLayout = StyleSheet.create({
  background: { flex: 1 },
  safeArea: { flex: 1 },
  content: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    gap: spacing.md,
  },
  infoPanel: {
    width: '40%',
  },
  parchmentWrap: {
    width: '100%',
  },
  parchmentContent: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    gap: spacing.xs,
    alignItems: 'flex-start' as const,
  },
  imagePanel: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: '100%',
    height: '100%',
  },
  title: {
    ...typography.body,
    fontFamily: 'CaesarDressing',
    color: colors.text,
    width: '100%',
  },
  lore: {
    ...typography.small,
    color: colors.text,
    lineHeight: 18,
  },
  btnLabel: {
    fontSize: 13,
    letterSpacing: 1,
  },
});
