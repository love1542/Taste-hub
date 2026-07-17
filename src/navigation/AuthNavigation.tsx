import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../screens/auth/screens/Login'
import { authRoutes } from '../constants/appConstants'
import { AuthStackParamList } from './type'
import ForgetPassword from '../screens/auth/screens/ForgetPassword'
import Signup from '../screens/auth/screens/Signup'
import Welcome from '../screens/auth/screens/Welcome'
import Home from '../screens/home/Home'

const stack = createNativeStackNavigator<AuthStackParamList>()
const AuthNavigation = () => {
  return (
    <stack.Navigator screenOptions={{headerShown:false}}>
      <stack.Screen name={authRoutes.welcome} component={Welcome}/>
      <stack.Screen name={authRoutes.login} component={Login}/>
      <stack.Screen name={authRoutes.signup} component={Signup}/>
      <stack.Screen name={authRoutes.forgotPassword} component={ForgetPassword}/>
      <stack.Screen name={authRoutes.home} component={Home}/>
    </stack.Navigator>
  )
}

export default AuthNavigation