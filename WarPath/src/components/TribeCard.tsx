import { Image, StyleSheet, Text, View } from 'react-native';

import { LEADER_BY_ID } from '../data/leaders';
import { colors, spacing } from '../theme';
import type { Tribe } from '../types';
import Divider from './Divider';
import Parchment from './Parchment';

export default function TribeCard({
  name,
  leaderId,
  meleeCount,
  rangeCount,
  vikingWon,
  horseWon,
  castleWon,
}: Tribe) {
  const leader = LEADER_BY_ID[leaderId] ?? LEADER_BY_ID.melee;

  return (
    <Parchment style={styles.card} contentStyle={styles.cardContent}>
      <Text style={styles.tribeName}>{name}</Text>
      <Divider />

      <View style={styles.mainRow}>
        <View style={styles.leaderCol}>
          <Image source={leader.image} style={styles.leaderImage} resizeMode="cover" />
          <Text style={styles.leaderBonus}>{leader.bonus}</Text>
        </View>

        <View style={styles.rightCol}>
          <View style={styles.troops}>
            <Text style={styles.troopLabel}>Melee</Text>
            <Text style={styles.troopCount}>{meleeCount}</Text>
            <Text style={styles.troopLabel}>Range</Text>
            <Text style={styles.troopCount}>{rangeCount}</Text>
          </View>

          <View style={styles.dividerH} />

          <View style={styles.conquests}>
            <Text style={styles.conquestLabel}>Conquered</Text>
            <Text style={vikingWon ? styles.won : styles.lost}>Viking Fleet</Text>
            <Text style={horseWon ? styles.won : styles.lost}>Horse Baron</Text>
            <Text style={castleWon ? styles.won : styles.lost}>King&apos;s Castle</Text>
          </View>
        </View>
      </View>
    </Parchment>
  );
}

const styles = StyleSheet.create({
  card: { width: '100%' },
  cardContent: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: 'stretch',
  },
  tribeName: {
    fontSize: 32,
    fontFamily: 'CaesarDressing',
    color: colors.primary,
    letterSpacing: 2,
    textAlign: 'center',
  },
  mainRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 6,
    alignItems: 'stretch',
  },
  leaderCol: {
    alignItems: 'center',
    gap: 6,
  },
  leaderImage: {
    width: 145,
    height: 220,
    overflow: 'hidden',
    borderRadius: 2,
  },
  leaderBonus: {
    fontSize: 13,
    color: colors.secondary,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  rightCol: {
    flex: 1,
    gap: spacing.xs,
    justifyContent: 'space-between',
  },
  troops: {
    alignItems: 'center',
    gap: 2,
  },
  troopLabel: {
    fontSize: 17,
    color: colors.text,
    fontWeight: '600',
  },
  troopCount: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.primary,
  },
  dividerH: {
    height: 1,
    backgroundColor: colors.secondary,
    opacity: 0.4,
  },
  conquests: {
    gap: 3,
    alignItems: 'center',
  },
  conquestLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
    textAlign: 'center',
  },
  won: { fontSize: 15, color: colors.won },
  lost: { fontSize: 15, color: colors.textMuted },
});
