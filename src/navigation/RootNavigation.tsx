import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthNavigation from './AuthNavigation'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Splash from '../screens/splash/Splash'
import { rootRoutes } from '../constants/appConstants'
import { RootStackParamList } from './type'
import OnBoarding from '../screens/onboarding/OnBoarding'
import AppNavigation from './AppNavigation'
import { useAuth } from '../hooks'

const stack = createNativeStackNavigator<RootStackParamList>()

const RootNavigation = () => {
  const { isLogin, isLoading, showOnboarding } = useAuth();

  return (
    <NavigationContainer>
      <stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoading ? (
          <stack.Screen
            name={rootRoutes.splash}
            component={Splash}
          />
        ) : showOnboarding ? (
          <stack.Screen
            name={rootRoutes.onBoarding}
            component={OnBoarding}
          />
        ) : isLogin ? (
          <stack.Screen
            name={rootRoutes.app}
            component={AppNavigation}
          />
        ) : (
          <stack.Screen
            name={rootRoutes.auth}
            component={AuthNavigation}
          />
        )}
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation