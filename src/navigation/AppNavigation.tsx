import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AppStackParamList } from './type'
import { appRoutes } from '../constants/appConstants'
import TabNavigation from './TabNavigation'


const stack = createNativeStackNavigator<AppStackParamList>()
const AppNavigation = () => {
  return (
      <stack.Navigator screenOptions={{headerShown: false}}>
        <stack.Screen name={appRoutes.mainTabs} component={TabNavigation}/>
      </stack.Navigator>
  )
}

export default AppNavigation