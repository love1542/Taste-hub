import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AppStackParamList } from './type'
import { appRoutes } from '../constants/appConstants'
import TabNavigation from './TabNavigation'
import { useLocation } from '../hooks/useLocation'


const stack = createNativeStackNavigator<AppStackParamList>()
const AppNavigation = () => {
  const {refreshCurrentLocation} = useLocation()

  useEffect(()=>{
    refreshCurrentLocation
  })

  return (
      <stack.Navigator screenOptions={{headerShown: false}}>
        <stack.Screen name={appRoutes.mainTabs} component={TabNavigation}/>
      </stack.Navigator>
  )
}

export default AppNavigation