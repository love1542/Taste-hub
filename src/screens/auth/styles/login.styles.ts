import { StyleSheet } from "react-native"
import { LayoutScaleType, palleteColorsType } from "../../../constants/theme"

export const loginStyles = (color: palleteColorsType, scale: LayoutScaleType) => {
    return StyleSheet.create({
        loginWrapper: {
            flex: 1,
            backgroundColor: color.dullwhite,
            padding: scale.lg_24,
            gap: scale.xxl_40
        },
        socialLoginsWrapper: {
            gap: scale.ml_20,
            alignItems: 'center',
            width: '100%',
        },
        orText: {
            fontSize: 14,
            lineHeight: 20,
            color: color.black,
            textAlign: 'center',
            marginBottom: scale.sm_8,
        },
        signupRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: scale.sm_8,
            flexWrap: 'wrap',
            justifyContent: 'center'
        },
        signupText: {
            fontSize: 15,
            lineHeight: 22,
            color: color.app404040,
        },
        signupLink: {
            fontWeight: '600',
            color: color.appPrimary,
        }
    })
}