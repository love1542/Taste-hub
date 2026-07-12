import { StyleSheet } from "react-native";
import { useTheme } from "../../constants/theme";

export const useOnBoardingStyles = () => {
    const { color, scale, palletteColors } = useTheme();
    return StyleSheet.create({
        bg: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0
        },
        rapper: {
            flex: 1,
            flexDirection: 'column',
            gap: scale.xl_32,
            padding: scale.lg_24,
            paddingBottom: scale.bannerSM_100
        },
        uperRapper: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingTop: scale.massive_64
        },
        topView: {
            width: '50%'
        },
        topChipText: {
            color: palletteColors.white,
            fontSize: scale.md_16,
        },
        topChip: {
            padding: scale.sm_8,
            paddingHorizontal: scale.md_16,
        },
        bottomView: {
            gap: scale.xl_32,
        },
        textContainer: {
            gap: scale.md_16,
        },
        container: {
            flex: 1,
            backgroundColor: 'transparent'
        },
        flatList: {
            flex: 1
        },
        flatListContent: {
            flexGrow: 1
        },
        page: {
            flex: 1,
            height: '100%'
        },
        bottomButtonContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        bottomOverlay: {
            position: 'absolute',
            left: scale.lg_24,
            right: scale.lg_24,
            bottom: scale.lg_24,
            zIndex: 10
        },
        heading: {
            color: palletteColors.white,
            fontSize: scale.avatarSM_40,
            fontWeight: 'bold'
        },
        subtitle: {
            color: palletteColors.white,
            fontSize: scale.md_16,
            fontWeight: 'regular'
        },
        nextButtonStyle: {
            width: scale.huge_48,
            height: scale.huge_48,
            paddingVertical: 0,
            paddingHorizontal: 0,
            justifyContent: 'center',
            alignItems: 'center',
        }
    })
}