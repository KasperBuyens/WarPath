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
    lore: 'In the northern icy seas, the Norsemen live. \nThey are allied to the Lion kingdom, and patrol the shores and waters in between their countries. \n\nIf we Orcs want to take the Human Lands, we must first sink their ships and capture Edgar, the Mad Viking King. \n\nOnly then will we be able to land ashore and continue our conquest.',
    image: vikingFleetImage,
    meleeCost: 20,
    rangeCost: 50,
    wonField: 'vikingWon',
    victoryTitle: 'The Fleet is Sunk!',
    victoryLore: 'The seas are burning! \n\nViking ships are lit ablaze and bleeding corpses are floating in the water. \n\nWe have captured the Mad Viking and brought him aboard the Orc Warship. \n\nOur troops can now safely sail towards the Lion Kingdom!',
    victoryImage: vikingFleetVictoryImage,
  },
  horseBaron: {
    title: 'Ambush the Horse Baron!',
    lore: 'The Horse Baron is a benevolent leader. \n\nHe made his fortune breeding and selling warhorses, which granted him the opportunity to become a vassal of Queen Eleonora of house Lionne. \n\nThe Baron likes to join patrols from time to time, and in this lies an opportunity. \n\nLay in ambush and kill his guards!',
    image: baronAmbushImage,
    meleeCost: 50,
    rangeCost: 30,
    wonField: 'horseWon',
    victoryTitle: 'The Baron is captured!',
    victoryLore: 'In a swift battle, all the soldiers and guards who accompanied the Baron were slaughtered. \n\nTheir blood still drips from the undergrowth while the noble leader of the horse knights is bound and taken.',
    victoryImage: baronAmbushVictoryImage,
  },
  castle: {
    title: "Siege the King's Castle!",
    lore: 'After hearing of the defeat of his allies, King Edward the Valiant cowers behind the walls of his fortress. \n\nA mighty army sits between the Orcs and the end of their conquest. The castle is well defended, but there is no doubt that it won\'t be enough to hold for long. \n\nOnce those gates fall, the Human Lands shall fall with them.',
    image: castleImage,
    meleeCost: 100,
    rangeCost: 100,
    wonField: 'castleWon',
    victoryTitle: 'The Castle is Yours!',
    victoryLore: 'The gates are shattered. \n\nOrc warriors flood the courtyard, cutting down the last of the King\'s guard. The castle that stood for hundreds of years is taken in a single night. \n\nWounded soldiers and knights are screaming in agony, others lie eerily still. Amidst the gore of the bloody battle that sealed the Humans\' fate, Edward knelt down in surrender. The \"Valiant\" no more, he will be stripped of his title and stature. \n\nThe Human Lands have no king. They have only a conqueror.',
    victoryImage: castleVictoryImage,
  },
};
