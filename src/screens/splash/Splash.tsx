import { View, Text, Image } from 'react-native'
import React from 'react'
import { useSplashStyles } from './splash.style'
import IconButton from '../../components/IconButton'

const Splash = () => {
    const styles = useSplashStyles(); 

    return (
        <View style={styles.container}>
            <Image source={require('../../../assets/splash/splash_bg.png')} style={styles.bg} />
            <IconButton source={require('../../../assets/icons/appIcon.png')}/>
            <Text style={styles.heading}>TasteHub</Text>
            <Text style={styles.title}>Food that finds you</Text>
        </View>

    )
}

export default Splash