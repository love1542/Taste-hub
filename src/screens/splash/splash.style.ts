import { StyleSheet } from 'react-native';
import { useTheme } from '../../constants/theme'; 

export const useSplashStyles = () => {
    const { color, scale, palletteColors } = useTheme();

    return StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center' 
        },
        bg: {
            position: 'absolute',
            width: '100%',
            height: '100%',
        },
        heading: {
            fontSize: scale.chip_24,
            fontWeight: '600',
            marginTop: scale.xl_32,
            marginBottom: scale.ms_12,
            color: palletteColors.white,
        },
        title: {
            fontSize: scale.iconSM_16,
            color: palletteColors.white,
        }
    });
};
