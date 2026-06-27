import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthNavigation from './AuthNavigation'
import { createNativeStackNavigator} from '@react-navigation/native-stack'
import Splash from '../screens/splash/Splash'


const stack = createNativeStackNavigator()

const RootNavigation = () => {
 const islogin:boolean = false
  return (
    <NavigationContainer>
      <stack.Navigator screenOptions={{headerShown: false}}>
        <stack.Screen name='splash' component={Splash}/>
        <stack.Screen name='auth' component={AuthNavigation}/>
        
      </stack.Navigator>
      
    </NavigationContainer>
  )
}

export default RootNavigation