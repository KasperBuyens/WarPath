// ─── Colors ───────────────────────────────────────────────────────────────────

export const colors = {
  // Brand
  primary:       '#5A0E12',
  primaryDark:   '#2B0507',
  secondary:     '#8B5A3C',
  secondaryDark: '#5D2E0D',
  statusBar:     '#310406',

  // Parchment
  parchment:     '#F5E6D3',
  parchmentDark: '#E8D5B7',
  imageBg:       '#C8C4BF',

  // Text
  text:          '#31221e',
  textLight:     '#F4E4D7',
  textMuted:     '#8B6B52',

  // UI states
  error:         '#8B0000',
  won:           '#2d6a2d',
  border:        '#5C5C5C',
  black:         '#000',

  // Out-of-character overlay
  oocBackground: 'rgba(60, 60, 60, 0.35)',
  oocText:       '#1a1a1a',
};

// ─── Spacing ──────────────────────────────────────────────────────────────────

export const spacing = {
  xs: 8,
  sm: 14,
  md: 24,
  lg: 32,
};

// ─── Typography ───────────────────────────────────────────────────────────────

export const typography = {
  heading: { fontSize: 32, fontFamily: 'CaesarDressing' },
  title:   { fontSize: 24, fontFamily: 'CaesarDressing', letterSpacing: 2 },
  body:    { fontSize: 17, lineHeight: 25 },
  caption: { fontSize: 14 },
  small:   { fontSize: 13 },
};

export const darkTextShadow = {
  textShadowColor:  'rgba(0,0,0,0.8)',
  textShadowOffset: { width: 1, height: 1 },
  textShadowRadius: 3,
};

// ─── Layout ───────────────────────────────────────────────────────────────────

export const PARCHMENT_WIDTH_RATIO = 0.85;
export const parchmentWidth        = '85%';

export const BAR_HEIGHT    = 60;
export const CLAW_OVERHANG = 70;
export const HEADER_HEIGHT = BAR_HEIGHT + CLAW_OVERHANG;

export const BUTTON_LIFT = 6;
