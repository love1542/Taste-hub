import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { loginStyles } from './splash.style'
import CenterIcon from './components/CenterIcon'

const Splash = () => {
    const navigation = useNavigation()

    useEffect(() => {
        setTimeout(() => {
            // navigation.navigate('auth')
        }, 3000);
    })
    return (
        <View style={loginStyles.container}>
            <Image source={require('../../../assets/splash/splash_bg.png')} style={loginStyles.bg} />
            <CenterIcon/>
            <Text style={loginStyles.heading}>TasteHub</Text>
            <Text style={loginStyles.title}>Food that finds you</Text>
        </View>

    )
}

export default Splash