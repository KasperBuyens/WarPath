// == Colors =============================================================

export const colors = {

  primary:'#5A0E12',
  primaryDark:'#2B0507',
  primaryDarkest:'#310406',
  secondary:'#8B5A3C',
  secondaryDark:'#5D2E0D',
  MapBorder:'#5C5C5C',


  // Backgrounds
  parchment:'#F5E6D3',
  imageBg:'#C8C4BF',

  // Text
  text:'#31221e',
  textLight:'#F4E4D7',
  textMuted:'#8B6B52',
  errorMessage:'#8B0000',
  won:'#2d6a2d',

  // Out-of-character overlay
  oocBackground:'rgba(60, 60, 60, 0.35)',
  oocText:'#1a1a1a',
};


// == Text typography =============================================================

export const typography = {
  heading: { fontSize: 32, fontFamily: 'CaesarDressing' },
  title:   { fontSize: 24, fontFamily: 'CaesarDressing', letterSpacing: 2 },
  body:    { fontSize: 17, lineHeight: 25 },
  caption: { fontSize: 14 },
  small:   { fontSize: 13 },
};

export const darkTextShadow = {
  textShadowColor:'rgba(0,0,0,0.8)',
  textShadowOffset: { width: 1, height: 1 },
  textShadowRadius: 3,
};


// == Spacing =============================================================

export const spacing = {
  xs: 8,
  sm: 14,
  md: 24,
  lg: 32,
};


// == Layout =============================================================

export const parchmentWidth = '85%';

export const navHeight    = 60;
export const clawOverhang = 70;
export const headerHeight = navHeight + clawOverhang;

export const buttonLift = 6;

export const headerOverlay = {
  position: 'absolute' as const,
  top: 0,
  left: 0,
  right: 0,
};
