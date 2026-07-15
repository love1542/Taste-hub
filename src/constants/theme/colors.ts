import { PaletteColors } from "./paletteColors";

export const LightColors = {
  // Brand
  primary: PaletteColors.appPrimary,
  primaryDark: PaletteColors.appPrimary2,
  // Background
  background: PaletteColors.white,
  card: PaletteColors.white,

  // Text
  textPrimary: PaletteColors.black,
  textSecondary: PaletteColors.app525252,
  textMuted: PaletteColors.app737373,
  textInverse: PaletteColors.white,

  // Borders
  border: PaletteColors.appD4D4D4,
  divider: PaletteColors.app404040,


  // Buttons
  buttonPrimary: PaletteColors.appPrimary,
  buttonDisabled: PaletteColors.appD4D4D4,

  // Status
  success: PaletteColors.green,
  error: PaletteColors.red,
  warning: PaletteColors.yellow,



  overlay: 'rgba(0,0,0,0.4)',
} as const;


export const DarkColors = {
  // Brand
  primary: PaletteColors.appPrimary,
  primaryDark: PaletteColors.appPrimary2,

  // Background
  background: PaletteColors.black,
  card: PaletteColors.app404040,

  // Text
  textPrimary: PaletteColors.white,
  textSecondary: PaletteColors.appD4D4D4,
  textMuted: PaletteColors.appA3A3A3,
  textInverse: PaletteColors.black,

  // Borders
  border: PaletteColors.app404040,
  divider: PaletteColors.app262626,


  // Buttons
  buttonPrimary: PaletteColors.appPrimary,
  buttonDisabled: PaletteColors.app525252,

  // Status
  success: PaletteColors.green,
  error: PaletteColors.red,
  warning: PaletteColors.yellow,

  overlay: 'rgba(255,255,255,0.1)',
}  satisfies ThemeColors;

export type ThemeColors = {
  [K in keyof typeof LightColors]: string;
};
