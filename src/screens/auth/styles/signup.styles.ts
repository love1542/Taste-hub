import { StyleSheet } from "react-native";
import { LayoutScaleType, palleteColorsType } from "../../../constants/theme";

export const signupStyles = (colors: palleteColorsType, scale: LayoutScaleType) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'flex-start',
            padding: scale.lg_24,
            gap: scale.xl_32,
            backgroundColor: colors.dullwhite
        },
        contentWrapper: {
            flex: 1,
            width: '100%',
        },
        scrollContent: {
            width: '100%',
        },
        continueButtonWrapper: {
            width: '100%',
            paddingTop: scale.sm_8,
            gap: scale.ml_20
        },
        loginRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: scale.sm_8,
            flexWrap: 'wrap',
            justifyContent: 'center',
        },
        loginText: {
            fontSize: 15,
            lineHeight: 22,
            color: colors.app404040,
        },
        loginLink: {
            fontWeight: '600',
            color: colors.appPrimary,
        },
    })
}