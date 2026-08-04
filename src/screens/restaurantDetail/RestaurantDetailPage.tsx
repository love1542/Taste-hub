import { View, Text } from 'react-native'
import React from 'react'
import { useGetRestaurantById, useGetRestaurantMenu } from './hooks/useQurries'
import { appRoutes } from '../../constants/appConstants'
import { AppStackParamList } from '../../navigation/type'
import { RouteProp, useRoute } from '@react-navigation/native'

type Props = RouteProp<AppStackParamList, typeof appRoutes.RestaurantDetail>

const RestaurantDetailPage = () => {
  const route = useRoute<Props>()
  const restaurantId = route.params.restaurantId
  const {isLoading: isRestaurantLoading, data: restaurantData} = useGetRestaurantById(restaurantId)
  const {isLoading: isMenuLoading, data: menuData} = useGetRestaurantMenu(restaurantId)
  return (
    <View>
      <Text>RestaurantDetailPage</Text>
      <Text> {restaurantData?.data?.name}</Text>
    </View>
  )
}

export default RestaurantDetailPage