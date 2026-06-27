import { Palette } from './palette';


export const LightColors = {
  // Brand
  primary: Palette.appFF6B35,
  primaryDark: Palette.appF35B24,
  primaryLight: Palette.appFFB88A,

  // Background
  background: Palette.white,
  surface: Palette.appFAFAFA,
  card: Palette.white,

  // Text
  textPrimary: Palette.app171717,
  textSecondary: Palette.app525252,
  textMuted: Palette.app737373,
  textInverse: Palette.white,

  // Borders
  border: Palette.appE5E5E5,
  divider: Palette.appF5F5F5,

  // Components
  searchBackground: Palette.appFAFAFA,
  categoryBackground: Palette.appFFF4ED,
  promoBanner: Palette.appFFE4D5,

  // Buttons
  buttonPrimary: Palette.appFF6B35,
  buttonSecondary: Palette.appFFF4ED,
  buttonDisabled: Palette.appD4D4D4,

  // Status
  success: Palette.app22C55E,
  error: Palette.appEF4444,
  warning: Palette.appF59E0B,

  // Food App UI
  ratingStar: Palette.appF59E0B,
  favoriteHeart: Palette.appEF4444,
  priceTag: Palette.app22C55E,

  overlay: 'rgba(0,0,0,0.4)',
} as const;


export const DarkColors = {
  // Brand
  primary: Palette.appFF6B35,
  primaryDark: Palette.appF35B24,
  primaryLight: Palette.appFFB88A,

  // Background
  background: Palette.app171717,
  surface: Palette.app262626,
  card: Palette.app404040,

  // Text
  textPrimary: Palette.white,
  textSecondary: Palette.appD4D4D4,
  textMuted: Palette.appA3A3A3,
  textInverse: Palette.black,

  // Borders
  border: Palette.app404040,
  divider: Palette.app262626,

  // Components
  searchBackground: Palette.app262626,
  categoryBackground: Palette.app404040,
  promoBanner: Palette.app262626,

  // Buttons
  buttonPrimary: Palette.appFF6B35,
  buttonSecondary: Palette.app404040,
  buttonDisabled: Palette.app525252,

  // Status
  success: Palette.app22C55E,
  error: Palette.appEF4444,
  warning: Palette.appF59E0B,

  // Food App UI
  ratingStar: Palette.appF59E0B,
  favoriteHeart: Palette.appEF4444,
  priceTag: Palette.app22C55E,

  overlay: 'rgba(255,255,255,0.1)',
} as const;