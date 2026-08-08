import { TextStyle, ViewStyle } from 'react-native';
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
    fontSize: 15,
    color: PaletteColors.app262626,
    fontFamily: 'Inter-Medium',
  },

  subtitle: {
    fontSize: 14,
    color: PaletteColors.app737373,
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
  },

  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  } satisfies ViewStyle,
  
  shadowCard: {
    padding:12,
    backgroundColor: PaletteColors.white,
    borderWidth: 1,
    borderColor: '#F1F1F1',
    borderRadius: 25,

    // iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 8,

    // Android
    elevation: 3,
  } satisfies ViewStyle,

} as const;

export type TypographyType = typeof Typography;