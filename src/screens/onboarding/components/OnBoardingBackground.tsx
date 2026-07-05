import { View, ImageSourcePropType, Image, StyleSheet } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { useTheme } from '../../../constants/theme'

export type OnBoardingBackgroundType = {
  image: ImageSourcePropType
  overlayColor?: string
}

const OnBoardingBackground = ({ image, overlayColor }: OnBoardingBackgroundType) => {
  const {palletteColors} = useTheme()
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.absoluteFill} />
      <LinearGradient 
        colors={['transparent', overlayColor || palletteColors.black]} 
        style={styles.absoluteFill} 
      />
    </View>
  )
}

export default OnBoardingBackground

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  absoluteFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  }
})