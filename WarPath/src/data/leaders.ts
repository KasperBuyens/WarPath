import magicLeader from '../../assets/Images/MagicLeader.png';
import meleeLeader from '../../assets/Images/MeleeLeader.png';
import rangeLeader from '../../assets/Images/RangeLeader.png';

export type Leader = {
  id: string;
  name: string;
  bonus: string;
  description: string;
  image: number;
};

export const LEADERS: Leader[] = [
  {
    id: 'melee',
    name: 'Melee Warlord',
    bonus: '2× Melee Power',
    description: 'Your sword-bearers strike twice as hard.',
    image: meleeLeader,
  },
  {
    id: 'range',
    name: 'Range Master',
    bonus: '2× Range Power',
    description: 'Your archers loose arrows with deadly precision.',
    image: rangeLeader,
  },
  {
    id: 'magic',
    name: 'Universal Commander',
    bonus: '1.5× All Power',
    description: 'All warriors fight with greater ferocity.',
    image: magicLeader,
  },
];

export const LEADER_BY_ID: Record<string, Leader> = Object.fromEntries(
  LEADERS.map((l) => [l.id, l])
);

export function getMeleeMultiplier(leaderId: string): number {
  if (leaderId === 'melee') return 2;
  if (leaderId === 'magic') return 1.5;
  return 1;
}

export function getRangeMultiplier(leaderId: string): number {
  if (leaderId === 'range') return 2;
  if (leaderId === 'magic') return 1.5;
  return 1;
}

export function getMeleeLossMultiplier(leaderId: string): number {
  if (leaderId === 'melee') return 0.5;
  if (leaderId === 'magic') return 0.75;
  return 1;
}

export function getRangeLossMultiplier(leaderId: string): number {
  if (leaderId === 'range') return 0.5;
  if (leaderId === 'magic') return 0.75;
  return 1;
}
