import { LightColors, DarkColors } from './colors';
import { LayoutScale, LayoutScaleType } from './layoutScales';
import { PaletteColors, palleteColorsType } from './paletteColors';


export interface ThemeType {
  paletteColors: palleteColorsType,
  readonly colors: {
    readonly [key in keyof typeof LightColors]: string;
  };
  scale: LayoutScaleType;
}


export const Themes = {
  light: {
    paletteColors: PaletteColors,
    colors: LightColors,
    scale: LayoutScale,
  }as ThemeType,

  dark: {
    paletteColors: PaletteColors,
    colors: DarkColors,
    scale: LayoutScale
  }as ThemeType,
};

export type themeMode = 'light' | 'dark'