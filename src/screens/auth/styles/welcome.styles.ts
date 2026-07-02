import { StyleSheet } from "react-native";
import { LayoutScaleType, palleteColorsType, TypographyType } from "../../../constants/theme";

export const useWelcomeStyles = (scale: LayoutScaleType, palette: palleteColorsType, typography: TypographyType) => {
    return (
        StyleSheet.create({
            container:{
                flex: 1,
                alignItems: 'center',
                padding: scale.lg_24,
                gap: scale.ml_20
            },
            logoContainer:{
                alignItems: 'center',
                gap: scale.ms_12
            },
            centerWrapper:{
            alignItems: 'center',
            gap: scale.ml_20,
            },
            loginView:{
                flex: 1,
                justifyContent: 'flex-end',
                gap: scale.ms_12,
                alignItems: 'center',
            },
            
        })
    )
}