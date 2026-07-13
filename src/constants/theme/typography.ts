import { TextStyle } from 'react-native';
import { PaletteColors } from './paletteColors';
import { width } from './layoutScales';

export const Typography = {

  largeheading: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '700',
    fontFamily: 'Inter-Bold',
  },

  subHeading: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },

  subtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },

  borderLine: {
    height: 1,
    width: '100%',
    backgroundColor: PaletteColors.app737373,
  },

  focusFiledBorder: {
    height: 3,
    width: '100%',
    backgroundColor: PaletteColors.appPrimary,
  }

} as const;

export type TypographyType = typeof Typography;