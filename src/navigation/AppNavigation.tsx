import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AppStackParamList } from './type'
import { appRoutes } from '../constants/appConstants'
import TabNavigation from './TabNavigation'
import RestaurantDetailPage from '../screens/restaurantDetail/RestaurantDetailPage'


const stack = createNativeStackNavigator<AppStackParamList>()
const AppNavigation = () => {

  return (
      <stack.Navigator screenOptions={{headerShown: false}}>
        <stack.Screen name={appRoutes.mainTabs} component={TabNavigation}/>
        <stack.Screen name={appRoutes.RestaurantDetail} component={RestaurantDetailPage} />
      </stack.Navigator>
  )
}

export default AppNavigation