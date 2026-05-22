export const colors = {
  primary: '#5A0E12',
  primaryDark: '#2B0507',
  secondary: '#8B5A3C',
  secondaryDark: '#5D2E0D',
  statusBar: '#310406',
  parchment: '#F5E6D3',
  parchmentDark: '#E8D5B7',
  text: '#31221e',
  textLight: '#F4E4D7',
  textMuted: '#8B6B52',
  error: '#8B0000',
  won: '#2d6a2d',
};

export const spacing = {
  xs: 8,
  sm: 14,
  md: 24,
  lg: 32,
};

export const parchmentWidth = '85%';

export const typography = {
  heading: { fontSize: 32, fontWeight: '700' as const },
  title: { fontSize: 24, fontWeight: '700' as const, letterSpacing: 2 },
  body: { fontSize: 17, lineHeight: 25 },
  caption: { fontSize: 14 },
  small: { fontSize: 13 },
};

export const darkTextShadow = {
  textShadowColor: 'rgba(0,0,0,0.8)',
  textShadowOffset: { width: 1, height: 1 },
  textShadowRadius: 3,
};
