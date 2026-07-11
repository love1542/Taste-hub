import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { LayoutScaleType, useTheme } from '../../../constants/theme'
import ImagePicker from '../../../components/imagePicker/ImagePicker'


type SignupProfileType = {
    onCameraPress: () => void
}
const SignupProfile = ({
    onCameraPress
}:SignupProfileType) => {
    const { typography, scale } = useTheme()
    const styles = signupProfileSyles(scale)
   
    return (
        <View>
            
            <View style={styles.titlesWrapper}>
                <Text style={typography.heading}>
                    Complete Your Profile
                </Text>
                <Text style={typography.textField}>Let's finish setting up your account.</Text>
            </View>

            <View>
                <ImagePicker 
                onCameraPress={onCameraPress}/>
            </View>
        </View>
    )
}

export default SignupProfile

const signupProfileSyles = (scale: LayoutScaleType) => {
    return StyleSheet.create({
        titlesWrapper: {
            gap: scale.lg_24
        }
    })
}