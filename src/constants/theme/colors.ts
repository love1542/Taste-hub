import { PaletteColors } from "./paletteColors";

export const LightColors = {
  // Brand
  primary: PaletteColors.appPrimary,
  primaryDark: PaletteColors.appPrimary2,
  primaryLight: PaletteColors.appFFB88A,

  // Background
  background: PaletteColors.white,
  surface: PaletteColors.appFAFAFA,
  card: PaletteColors.white,

  // Text
  textPrimary: PaletteColors.black,
  textSecondary: PaletteColors.app525252,
  textMuted: PaletteColors.app737373,
  textInverse: PaletteColors.white,

  // Borders
  border: PaletteColors.appE5E5E5,
  divider: PaletteColors.appF5F5F5,

  // Components
  searchBackground: PaletteColors.appFAFAFA,
  categoryBackground: PaletteColors.appFFF4ED,
  promoBanner: PaletteColors.appFFE4D5,

  // Buttons
  buttonPrimary: PaletteColors.appPrimary,
  buttonSecondary: PaletteColors.appFFF4ED,
  buttonDisabled: PaletteColors.appD4D4D4,

  // Status
  success: PaletteColors.app22C55E,
  error: PaletteColors.appEF4444,
  warning: PaletteColors.appF59E0B,

  // Food App UI
  ratingStar: PaletteColors.appF59E0B,
  favoriteHeart: PaletteColors.appEF4444,
  priceTag: PaletteColors.app22C55E,

  overlay: 'rgba(0,0,0,0.4)',
} as const;


export const DarkColors = {
  // Brand
  primary: PaletteColors.appPrimary,
  primaryDark: PaletteColors.appPrimary2,
  primaryLight: PaletteColors.appFFB88A,

  // Background
  background: PaletteColors.black,
  surface: PaletteColors.app262626,
  card: PaletteColors.app404040,

  // Text
  textPrimary: PaletteColors.white,
  textSecondary: PaletteColors.appD4D4D4,
  textMuted: PaletteColors.appA3A3A3,
  textInverse: PaletteColors.black,

  // Borders
  border: PaletteColors.app404040,
  divider: PaletteColors.app262626,

  // Components
  searchBackground: PaletteColors.app262626,
  categoryBackground: PaletteColors.app404040,
  promoBanner: PaletteColors.app262626,

  // Buttons
  buttonPrimary: PaletteColors.appPrimary,
  buttonSecondary: PaletteColors.app404040,
  buttonDisabled: PaletteColors.app525252,

  // Status
  success: PaletteColors.app22C55E,
  error: PaletteColors.appEF4444,
  warning: PaletteColors.appF59E0B,

  // Food App UI
  ratingStar: PaletteColors.appF59E0B,
  favoriteHeart: PaletteColors.appEF4444,
  priceTag: PaletteColors.app22C55E,

  overlay: 'rgba(255,255,255,0.1)',
}  satisfies ThemeColors;

export type ThemeColors = {
  [K in keyof typeof LightColors]: string;
};
