import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import CenterIcon from './components/CenterIcon'
import { useSplashStyles } from './splash.style'
import { authRoutes, rootRoutes } from '../../constants/appConstants'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../navigation/type'

type SplashNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
    'splash'
>;

const Splash = () => {
    const navigation = useNavigation<SplashNavigationProp>()
    const styles = useSplashStyles(); 

    useEffect(() => {
  const timer = setTimeout(() => {
    navigation.navigate(rootRoutes.auth, {
      screen: authRoutes.login,
    });
  }, 3000);

  return () => clearTimeout(timer);
}, [navigation]);


    return (
        <View style={styles.container}>
            <Image source={require('../../../assets/splash/splash_bg.png')} style={styles.bg} />
            <CenterIcon/>
            <Text style={styles.heading}>TasteHub</Text>
            <Text style={styles.title}>Food that finds you</Text>
        </View>

    )
}

export default Splash