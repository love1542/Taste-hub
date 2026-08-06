import { View, Text } from 'react-native'
import React from 'react'
import { useGetLocations } from '../home/hooks/useQurrys'
import { useLocation } from '../../hooks/useLocation'

const Orders = () => {
  const query = 'Mansa'
  const { data } = useGetLocations(query)

  const {hasLocationPermission} = useLocation()
  return (
    <View>
      <Text>Orders</Text>
      {
        data?.map((location) => {
          return (
            <View key={location.place_id}>
              <Text>{location.display_name}</Text>

              <Text>{hasLocationPermission ? 'Location permission granted' : 'Location permission denied'}</Text>
            </View>
          )
        })
      }
    </View>
  )
}

export default Orders