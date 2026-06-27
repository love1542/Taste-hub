import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../screens/auth/Login'


const stack = createNativeStackNavigator()
const AuthNavigation = () => {
  return (
    <stack.Navigator screenOptions={{headerShown:false}}>
        <stack.Screen name='login' component={Login}/>
    </stack.Navigator>
  )
}

export default AuthNavigation