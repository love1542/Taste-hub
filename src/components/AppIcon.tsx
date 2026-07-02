import { View, Image, StyleSheet } from 'react-native'
import React from 'react'

const AppIcon = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/icons/appIcon.png')} style={styles.icon} />
        </View>
    )
}

export default AppIcon

const styles = StyleSheet.create({
    container: {
        height: 80,
        width: 80,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FF6B35",
        borderRadius: 20
    },
    icon: {
        height: 45,
        width: 45,
        margin: 20
    }
})