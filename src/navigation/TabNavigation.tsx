import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MainTabRoutes } from '../constants/appConstants'
import { Heart, HomeIcon, Toolbox, UserRound } from 'lucide-react-native';
import Favourites from '../screens/favourite/Favourites'
import Orders from '../screens/orders/Orders'
import Profile from '../screens/profile/Profile'
import CustomTabBar from './CustomTabBar'
import Home from '../screens/home/Home';

const Tab = createBottomTabNavigator()

const TabNavigation = () => {
  return (
    <Tab.Navigator tabBar={(props)=> <CustomTabBar {...props}/>}>
      <Tab.Screen name={MainTabRoutes.home} 
      component={Home} 
      options={{tabBarIcon(props) {
        return <HomeIcon size={props.size} color={props.color}/>
      },}}/>

      <Tab.Screen name={MainTabRoutes.favourites} 
      component={Favourites}
      options={{tabBarIcon(props) {
        return <Heart size={props.size} color={props.color} />
      },}}
      />

      <Tab.Screen name={MainTabRoutes.orders} 
      component={Orders}
      options={{tabBarIcon(props) {
        return <Toolbox size={props.size} color={props.color} />
      },}}
      />

      <Tab.Screen name={MainTabRoutes.profile} 
      component={Profile}
      options={{tabBarIcon(props) {
        return <UserRound size={props.size} color={props.color} />
      },}}
      />

    </Tab.Navigator>
  )
}

export default TabNavigation