import { View, Text } from 'react-native'
import React from 'react'
import { useGetLocations } from '../home/hooks/useQurrys'

const Orders = () => {
  const query = 'Mansa'
  const { data } = useGetLocations(query)
  return (
    <View>
      <Text>Orders</Text>
      {
        data?.map((location) => {
          return (
            <View key={location.place_id}>
              <Text>{location.display_name}</Text>
            </View>
          )
        })
      }
    </View>
  )
}

export default Orders