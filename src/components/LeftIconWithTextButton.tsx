import React from 'react'
import {
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  StyleProp,
  TextStyle,
  ViewStyle,
  ImageSourcePropType,
  View,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { useTheme } from '../constants/theme'

export type LeftIconWithTextButtonProps = {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode

  imageIcon?: ImageSourcePropType

  text?: string
  onPress?: () => void
  disabled?: boolean
  colors?: string[]

  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
}

const LeftIconWithTextButton = ({
  leftIcon,
  rightIcon,
  imageIcon,
  text,
  onPress,
  disabled = false,
  style,
  textStyle,
  colors = ['#ffffff', '#ffffff'],
}: LeftIconWithTextButtonProps) => {
  const styles = useButtonStyles()

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.container,
        style,
        disabled && styles.disabled,
      ]}
    >
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[StyleSheet.absoluteFill, styles.gradient]}
      />

      
      {leftIcon && (
        <View style={[styles.iconWrapper, !(text || rightIcon) && styles.iconOnly]}>
          {leftIcon}
        </View>
      )}

      {!leftIcon && imageIcon && (
        <Image
          source={imageIcon}
          style={styles.imageIcon}
        />
      )}

      {text && (
        <Text style={[styles.text, textStyle]}>
          {text}
        </Text>
      )}

      {rightIcon && (
        <View style={styles.iconWrapper}>
          {rightIcon}
        </View>
      )
      }
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

      paddingVertical: scale.ms_12,
      paddingHorizontal: scale.xl_18,

      borderRadius: scale.iconSM_16,

      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowRadius: 6,
      elevation: 4,
    },

    gradient: {
      borderRadius: scale.iconSM_16,
    },

    iconWrapper: {
      marginRight: scale.sm_8, 
      zIndex: 1,
    },

    iconOnly: {
      marginRight: 0,
    },

    imageIcon: {
      width: 20,
      height: 20,
      marginRight: scale.sm_8,
      zIndex: 1,
      resizeMode: 'contain',
    },

    text: {
      color: color.textPrimary,
      fontSize: scale.md_16,
      fontWeight: '600',
      zIndex: 1,
    },

    disabled: {
      opacity: 0.5,
    },
  })
}