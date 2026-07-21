import { StyleSheet } from "react-native"
import { palleteColorsType } from "../../../constants/theme"

export const loginStyles = (color: palleteColorsType) => {
    return StyleSheet.create({
        loginWrapper: {
            flex: 1,
            backgroundColor: color.dullwhite
        }
    })
}