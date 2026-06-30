import { Text, ImageSourcePropType, TouchableOpacity, Image, StyleSheet, StyleProp, ImageStyle, TextStyle, ViewStyle } from 'react-native'
import React from 'react'
import { useTheme } from '../constants/theme'
import { LinearGradient } from 'react-native-linear-gradient'

export type LeftIconWithTextButtonProps = {
    icon?: ImageSourcePropType
    text?: string
    onPress?: () => void
    disabled?: boolean
    colors?: string[]

    style?: StyleProp<ViewStyle>
    textStyle?: StyleProp<TextStyle>
    iconStyle?: StyleProp<ImageStyle>
}

const LeftIconWithTextButton = ({
    icon,
    text,
    onPress,
    disabled = false,
    style,
    textStyle,
    iconStyle,
    colors = ['#ffffff', '#ffffff'],
}: LeftIconWithTextButtonProps) => {

    const styles = useButtonStyles()
    
    return (
        <TouchableOpacity 
            onPress={onPress} 
            style={[styles.container, style, disabled ? styles.disabled : null]} 
            disabled={disabled}
        >
            <LinearGradient
                colors={colors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}  
                style={[StyleSheet.absoluteFill, styles.gradientRadius]}
            />

            {icon && <Image source={icon} style={[styles.icon, iconStyle]} />}
            {text && <Text style={[styles.text, textStyle]}>{text}</Text>}
        </TouchableOpacity>
    )
}

export default LeftIconWithTextButton

const useButtonStyles = () => {
    const { color, scale } = useTheme()
    return StyleSheet.create({
        container: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: scale.iconSM_16,
            padding: scale.iconSM_16,
            alignSelf: 'flex-start',
            shadowColor: '#000000',
            shadowOpacity: 0.25,
            shadowOffset: {
                width: 0,
                height: 8,
            },
            shadowRadius: 8,
            elevation: 5,
        },
        gradientRadius: {
            borderRadius: scale.iconSM_16, 
        },
        icon: {
            width: 20,
            height: 20,
            zIndex: 1, 
        },
        text: {
            color: color.textPrimary,
            fontSize: scale.lg_24,
            zIndex: 1, 
        },
        disabled: {
            opacity: 0.5,
        },
    })
}
