import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MainTabRoutes } from '../constants/appConstants'
import { Home } from 'lucide-react-native'
import Favourites from '../screens/favourite/Favourites'
import Orders from '../screens/orders/Orders'
import Profile from '../screens/profile/Profile'

const Tab = createBottomTabNavigator()

const TabNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name={MainTabRoutes.home} component={Home}/>
      <Tab.Screen name={MainTabRoutes.favourites} component={Favourites}/>
      <Tab.Screen name={MainTabRoutes.orders} component={Orders}/>
      <Tab.Screen name={MainTabRoutes.profile} component={Profile}/>
    </Tab.Navigator>
  )
}

export default TabNavigation