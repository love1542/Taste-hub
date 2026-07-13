import { StyleSheet } from "react-native";
import { LayoutScaleType, palleteColorsType, TypographyType } from "../../../constants/theme";

export const useWelcomeStyles = (scale: LayoutScaleType, palette: palleteColorsType, typography: TypographyType) => {
    return (
        StyleSheet.create({
            container: {
                flex: 1,
                alignItems: 'center',
                padding: scale.lg_24,
                gap: scale.ml_20
            },
            bg: {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            },
            logoContainer: {
                alignItems: 'center',
                gap: scale.xsm_6,
                marginTop: scale.massive_64,
            },
            name: {
                flexDirection: 'row',
                alignSelf: 'center',
                gap: scale.sm_8,
            },
            titles: {
                alignItems: 'center',
                width: '100%'
            },
            subtitleText: {
                paddingHorizontal: scale.ml_20,
                color: palette.black,
                textAlign: 'center',
                fontWeight: '500',
            },
            centerWrapper: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                gap: scale.ml_20,
                width: '100%',
            },
            socialLoginsWrapper: {
                gap: scale.ml_20,
                alignItems: 'center',
                width: '100%',
                paddingTop: scale.lg_24,
            },
            orText: {
                fontSize: 14,
                lineHeight: 20,
                color: palette.black,
                textAlign: 'center',
                marginBottom: scale.sm_8,
            },
            divider: {
                marginBottom: scale.ms_12,
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
                color: palette.app404040,
            },
            loginLink: {
                fontWeight: '600',
                color: palette.appPrimary,
            },
            footerText: {
                fontSize: 13,
                lineHeight: 20,
                color: palette.black,
                textAlign: 'center',
                paddingHorizontal: scale.lg_24,
                letterSpacing: 0.2,

            },
            linkText: {
                color: palette.appPrimary,
                fontWeight: '500'
            },
            loginView: {
                justifyContent: 'flex-end',
                gap: scale.ms_12,
                alignItems: 'center',
            },

        })
    )
}