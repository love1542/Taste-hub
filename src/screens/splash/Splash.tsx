import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSplashStyles } from './splash.style'
import { authRoutes, rootRoutes } from '../../constants/appConstants'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../navigation/type'
import { STORAGE_KEYS, storageService } from '../../services/storageService'
import AppIcon from '../../components/AppIcon'

type SplashNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
    'splash'
>;

const Splash = () => {
    const navigation = useNavigation<SplashNavigationProp>()
    const styles = useSplashStyles(); 

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const bootApp = async () => {
      const showOnboarding = await storageService.get(STORAGE_KEYS.showOnboarding)

      timer = setTimeout(()=>{
        if (showOnboarding == true || showOnboarding == null) {
          navigation.replace(rootRoutes.onBoarding)
        }else {
          navigation.replace(rootRoutes.auth,{
            screen: authRoutes.login
          })
        }
      },2000)

      }

      bootApp()
  return () => clearTimeout(timer);
    },[navigation]);


    return (
        <View style={styles.container}>
            <Image source={require('../../../assets/splash/splash_bg.png')} style={styles.bg} />
            <AppIcon/>
            <Text style={styles.heading}>TasteHub</Text>
            <Text style={styles.title}>Food that finds you</Text>
        </View>

    )
}

export default Splash