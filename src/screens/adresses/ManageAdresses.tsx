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


type NavigationType = NativeStackNavigationProp<AppStackParamList , typeof appRoutes.manageAdress>

const ManageAdresses = () => {
  const { scale, palletteColors } = useTheme()
  const styles = pageStyle(palletteColors, scale)
  const [addresses, setAddresses] = useState<DeliveryAddress[]>([
    {
      id: 'address-1',
      userId: 'user-1',
      label: 'home',
      receiverName: 'Love',
      receiverPhone: '9876543210',
      addressLine: 'Main Market Road',
      area: 'Budhlada',
      landmark: 'Near Bus Stand',
      city: 'Budhlada',
      state: 'Punjab',
      postalCode: '151502',
      latitude: 29.9271,
      longitude: 75.5626,
      isDefault: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'address-2',
      userId: 'user-1',
      label: 'work',
      receiverName: 'Love',
      receiverPhone: '9876543210',
      addressLine: 'Civil Lines',
      area: 'Mansa',
      city: 'Mansa',
      state: 'Punjab',
      postalCode: '151505',
      latitude: 29.9885,
      longitude: 75.3937,
      isDefault: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'address-3',
      userId: 'user-1',
      label: 'other',
      receiverName: 'Love',
      receiverPhone: '9876543210',
      addressLine: 'Model Town',
      area: 'Sangrur',
      city: 'Sangrur',
      state: 'Punjab',
      postalCode: '148001',
      latitude: 30.2458,
      longitude: 75.8421,
      isDefault: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]);
   const navigation = useNavigation<NavigationType>()

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: palletteColors.dullwhite }}>
      <AppHeader
        title='Manage Adresses'
        onBackPress={navigation.goBack}
        rightText='Add'
        rightAction={() => navigation.navigate('AddAdress',{screenType: ADD_ADDRESS_TYPE.ADD})}
      />

      <ScrollView style={[styles.container, { flex: 1 }]}>
        {
          addresses.map((address) => (
            <View key={address.id} style={{ marginHorizontal: scale.md_16, marginVertical: scale.sm_8 }}>
              <AddressCell address={address} />
            </View>
          ))
        }
      </ScrollView>
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