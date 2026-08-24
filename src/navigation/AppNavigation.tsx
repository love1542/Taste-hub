import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AppStackParamList } from './type'
import { appRoutes } from '../constants/appConstants'
import TabNavigation from './TabNavigation'
import RestaurantDetailPage from '../screens/restaurantDetail/RestaurantDetailPage'
import EditProfile from '../screens/profile/EditProfile'
import ManageAdresses from '../screens/adresses/ManageAdresses'
import AddAdress from '../screens/adresses/AddAdress'
import ConfirmAdress from '../screens/confirmAdress/ConfirmAdress'


const stack = createNativeStackNavigator<AppStackParamList>()
const AppNavigation = () => {
  return (
      <stack.Navigator screenOptions={{headerShown: false}}>
        <stack.Screen name={appRoutes.mainTabs} component={TabNavigation}/>
        <stack.Screen name={appRoutes.RestaurantDetail} component={RestaurantDetailPage} />
        <stack.Screen name={appRoutes.editProfile} component={EditProfile} />
        <stack.Screen name={appRoutes.manageAdress} component={ManageAdresses} />
        <stack.Screen name={appRoutes.addAdress} component={AddAdress} />
        <stack.Screen name={appRoutes.confirmAdress} component={ConfirmAdress} />
      </stack.Navigator>
  )
}

export default AppNavigation