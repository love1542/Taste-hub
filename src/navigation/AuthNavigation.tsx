import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../screens/auth/Login'
import { authRoutes } from '../constants/appConstants'
import { AuthStackParamList } from './type'


const stack = createNativeStackNavigator<AuthStackParamList>()
const AuthNavigation = () => {
  return (
    <stack.Navigator screenOptions={{headerShown:false}}>
        <stack.Screen name={authRoutes.login} component={Login}/>
    </stack.Navigator>
  )
}

export default AuthNavigation