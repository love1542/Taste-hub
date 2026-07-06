import { StyleSheet } from "react-native";
import { LayoutScaleType, palleteColorsType } from "../../../constants/theme";

export const signupStyles = (colors: palleteColorsType, scale: LayoutScaleType) =>{
    return StyleSheet.create({
        // Container 

        container:{ 
            flex: 1, 
            alignItems: 'flex-start', 
            padding: scale.lg_24, 
            gap: scale.md_16 
        }

        ,
        backButton: {
            alignSelf: 'flex-start',
            width: scale.huge_48,
            height: scale.huge_48,
            paddingVertical: 0,
            paddingHorizontal: 0,
            borderRadius: scale.huge_48 / 2,
            justifyContent: 'center',
            alignItems: 'center',
        }



        // stepOne 


    })
}