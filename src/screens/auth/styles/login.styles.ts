import { StyleSheet } from "react-native"
import { LayoutScaleType, palleteColorsType } from "../../../constants/theme"

export const loginStyles = (color: palleteColorsType, scale: LayoutScaleType) => {
    return StyleSheet.create({
        loginWrapper: {
            flex: 1,
            backgroundColor: color.background,
            padding: scale.lg_24,
            gap: scale.lg_24,
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
        },
        bglogo:{
            height:210,
            width:210,
            position:'absolute',
            bottom:-50,
            right:-90
        }
    })
}