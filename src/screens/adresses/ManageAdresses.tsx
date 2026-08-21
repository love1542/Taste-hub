import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppHeader from '../../components/AppHeader'
import { LayoutScaleType, PaletteColors, palleteColorsType, useTheme } from '../../constants/theme'
import { DeliveryAddress } from './types/adress.type'
import AddressCell from './components/AddressCell'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { ADD_ADDRESS_TYPE, AppStackParamList } from '../../navigation/type'
import { appRoutes } from '../../constants/appConstants'
import { useGetAddress } from './hooks/querryHooks'


type NavigationType = NativeStackNavigationProp<AppStackParamList , typeof appRoutes.manageAdress>

const ManageAdresses = () => {
  const { scale, palletteColors } = useTheme()
  const styles = pageStyle(palletteColors, scale)
  const {data} = useGetAddress()
   const navigation = useNavigation<NavigationType>()

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: palletteColors.dullwhite }}>
      <AppHeader
        title='Manage Adresses'
        onBackPress={navigation.goBack}
        rightText='Add'
        rightAction={() => navigation.navigate('AddAdress',{screenType: ADD_ADDRESS_TYPE.ADD})}
      />

      {
        data?.data ? <ScrollView style={[styles.container, { flex: 1 }]}>
        {
          data?.data.map((address) => (
            <View key={address.id} style={{ marginHorizontal: scale.md_16, marginVertical: scale.sm_8 }}>
              <AddressCell address={address} />
            </View>
          ))
        }
      </ScrollView>
      :
      <View>
        <Text>Not data</Text>
      </View>
      }

      
    </SafeAreaView>
  )
}

export default ManageAdresses

const pageStyle = (color: palleteColorsType, scale: LayoutScaleType) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: PaletteColors.dullwhite
    }
  })
}