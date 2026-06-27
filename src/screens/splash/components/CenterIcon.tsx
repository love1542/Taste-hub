import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

const CenterIcon = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../../../../assets/icons/appIcon.png')} style={styles.icon}/>
    </View>
  )
}

export default CenterIcon

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        borderRadius: 32
    },
    icon: {
        height: 50,
        width:50,
        margin:20
    }
})