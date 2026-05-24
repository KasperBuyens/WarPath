import { StyleSheet } from 'react-native';

import { colors, parchmentWidth, spacing } from '../theme';

export const authFormStyles = StyleSheet.create({
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
  fields: {
    width: '100%',
    gap: spacing.sm,
  },
  error: {
    color: colors.errorMessage,
    fontSize: 13,
    marginTop: -6,
  },
  returnButton: {
    width: '50%',
    alignSelf: 'center',
  },
});
