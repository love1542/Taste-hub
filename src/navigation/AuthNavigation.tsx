import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../screens/auth/screens/login/Login'
import { authRoutes } from '../constants/appConstants'
import { AuthStackParamList } from './type'
import ForgetPassword from '../screens/auth/screens/forgerPassword/ForgetPassword'
import Home from '../screens/home/Home'
import Signup from '../screens/auth/screens/register/Signup'

const stack = createNativeStackNavigator<AuthStackParamList>()
const AuthNavigation = () => {
  return (
    <stack.Navigator screenOptions={{headerShown:false}}>
      <stack.Screen name={authRoutes.login} component={Login}/>
      <stack.Screen name={authRoutes.signup} component={Signup}/>
      <stack.Screen name={authRoutes.forgotPassword} component={ForgetPassword}/>
      <stack.Screen name={authRoutes.home} component={Home}/>
    </stack.Navigator>
  )
}

export default AuthNavigation