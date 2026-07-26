import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthNavigation from './AuthNavigation'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Splash from '../screens/splash/Splash'
import { rootRoutes } from '../constants/appConstants'
import { RootStackParamList } from './type'
import OnBoarding from '../screens/onboarding/OnBoarding'
import AppNavigation from './AppNavigation'

const stack = createNativeStackNavigator<RootStackParamList>()

const RootNavigation = () => {
  const islogin: boolean = false
  return (
    <NavigationContainer>
      <stack.Navigator screenOptions={{ headerShown: false }}>
        <stack.Screen name={rootRoutes.splash} component={Splash} />
        <stack.Screen name={rootRoutes.onBoarding} component={OnBoarding} />
        <stack.Screen name={rootRoutes.auth} component={AuthNavigation} />
        <stack.Screen name={rootRoutes.app} component={AppNavigation} />
      </stack.Navigator>

    </NavigationContainer>
  )
}

export default RootNavigation