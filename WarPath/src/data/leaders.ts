import magicLeader from '../../assets/Images/MagicLeader.png';
import meleeLeader from '../../assets/Images/MeleeLeader.png';
import rangeLeader from '../../assets/Images/RangeLeader.png';

export type Leader = {
  id: string;
  name: string;
  bonus: string;
  description: string;
  image: number;
  meleeMultiplier: number;
  rangeMultiplier: number;
  meleeLossMultiplier: number;
  rangeLossMultiplier: number;
};

export const LEADERS: Leader[] = [
  {
    id: 'melee',
    name: 'Melee Warlord',
    bonus: '2× Melee Power',
    description: 'Your sword-bearers strike twice as hard.',
    image: meleeLeader,
    meleeMultiplier: 2,
    rangeMultiplier: 1,
    meleeLossMultiplier: 0.5,
    rangeLossMultiplier: 1,
  },
  {
    id: 'range',
    name: 'Range Master',
    bonus: '2× Range Power',
    description: 'Your archers loose arrows with deadly precision.',
    image: rangeLeader,
    meleeMultiplier: 1,
    rangeMultiplier: 2,
    meleeLossMultiplier: 1,
    rangeLossMultiplier: 0.5,
  },
  {
    id: 'magic',
    name: 'Universal Commander',
    bonus: '1.5× All Power',
    description: 'All warriors fight with greater ferocity.',
    image: magicLeader,
    meleeMultiplier: 1.5,
    rangeMultiplier: 1.5,
    meleeLossMultiplier: 0.75,
    rangeLossMultiplier: 0.75,
  },
];

export const LEADER_BY_ID: Record<string, Leader> = Object.fromEntries(
  LEADERS.map((l) => [l.id, l])
);

export function getMeleeMultiplier(leaderId: string): number {
  return LEADER_BY_ID[leaderId]?.meleeMultiplier ?? 1;
}

export function getRangeMultiplier(leaderId: string): number {
  return LEADER_BY_ID[leaderId]?.rangeMultiplier ?? 1;
}

export function getMeleeLossMultiplier(leaderId: string): number {
  return LEADER_BY_ID[leaderId]?.meleeLossMultiplier ?? 1;
}

export function getRangeLossMultiplier(leaderId: string): number {
  return LEADER_BY_ID[leaderId]?.rangeLossMultiplier ?? 1;
}
