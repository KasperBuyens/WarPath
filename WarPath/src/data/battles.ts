import baronAmbushImage from '../../assets/Images/BaronAmbushBattle.png';
import baronAmbushVictoryImage from '../../assets/Images/BaronAmbushVictory.png';
import castleImage from '../../assets/Images/CastleBattle.png';
import castleVictoryImage from '../../assets/Images/CastleVictory.png';
import vikingFleetImage from '../../assets/Images/VikingFleetBattle.png';
import vikingFleetVictoryImage from '../../assets/Images/VikingFleetVictorty.png';

export type Battle = {
  title: string;
  lore: string;
  image: number;
  meleeCost: number;
  rangeCost: number;
  wonField: 'vikingWon' | 'horseWon' | 'castleWon';
  victoryTitle: string;
  victoryLore: string;
  victoryImage: number;
};

export const BATTLES: Record<string, Battle> = {
  vikingFleet: {
    title: 'Sink the Viking Fleet!',
    lore: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    image: vikingFleetImage,
    meleeCost: 20,
    rangeCost: 50,
    wonField: 'vikingWon',
    victoryTitle: 'The Fleet is Sunk!',
    victoryLore: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    victoryImage: vikingFleetVictoryImage,
  },
  horseBaron: {
    title: 'Ambush the Horse Baron!',
    lore: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    image: baronAmbushImage,
    meleeCost: 50,
    rangeCost: 30,
    wonField: 'horseWon',
    victoryTitle: 'The Baron Falls!',
    victoryLore: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    victoryImage: baronAmbushVictoryImage,
  },
  castle: {
    title: "Siege the King's Castle!",
    lore: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    image: castleImage,
    meleeCost: 100,
    rangeCost: 100,
    wonField: 'castleWon',
    victoryTitle: 'The Castle is Yours!',
    victoryLore: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    victoryImage: castleVictoryImage,
  },
};
