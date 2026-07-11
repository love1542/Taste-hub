import { LightColors, DarkColors, ThemeColors } from './colors';
import { LayoutScale, LayoutScaleType } from './layoutScales';
import { PaletteColors, palleteColorsType } from './paletteColors';
import { Typography, TypographyType } from './typography';


export interface ThemeType {
  paletteColors: palleteColorsType,
  colors: ThemeColors;
  scale: LayoutScaleType;
  typography: TypographyType;
}


export const Themes = {
  light: {
    paletteColors: PaletteColors,
    colors: LightColors,
    scale: LayoutScale,
    typography: Typography
  }as ThemeType,

  dark: {
    paletteColors: PaletteColors,
    colors: DarkColors,
    scale: LayoutScale,
    typography: Typography
  }as ThemeType,
};

export type themeMode = 'light' | 'dark'