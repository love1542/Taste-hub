import { View, ImageSourcePropType, Image, StyleSheet } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'

export type OnBoardingBackgroundType = {
  image: ImageSourcePropType
}

const OnBoardingBackground = ({ image }: OnBoardingBackgroundType) => {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.absoluteFill} />
      <LinearGradient 
        colors={['transparent', 'rgba(0,0,0,0.8)']} 
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