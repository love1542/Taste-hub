import { LightColors, DarkColors } from './colors';
import { Sizes } from './sizes';
import { Spacing } from './spacing';


export interface ThemeType {
  readonly colors: {
    readonly [key in keyof typeof LightColors]: string;
  };
  readonly Spacing: typeof Spacing;
  readonly Sizes: typeof Sizes;
}


export const Themes = {
  light: {
    colors: LightColors,
    Spacing: Spacing,
    Sizes: Sizes
  }as ThemeType,

  dark: {
    colors: DarkColors,
    Spacing: Spacing,
    Sizes: Sizes
  }as ThemeType,
};

export type themeMode = 'light' | 'dark'