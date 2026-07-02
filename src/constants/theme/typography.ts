import { TextStyle } from 'react-native';
import { PaletteColors } from './paletteColors';
import { width } from './layoutScales';

export const Typography = {

  heading: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '700',
  },

  subHeading: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '600',
  },

  title: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    textAlign: 'center'
  },

  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    textAlign: 'center'
  },

  borderLine: {
   height: 1,
   width: width - 48,
  backgroundColor: PaletteColors.app737373,
  }

} as const ;

export type TypographyType = typeof Typography;