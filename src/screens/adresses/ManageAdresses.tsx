import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native'
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
import { useDeleteAddress, useSetDefaultAddress } from './hooks/mutationHooks'


type NavigationType = NativeStackNavigationProp<AppStackParamList , typeof appRoutes.manageAdress>

const ManageAdresses = () => {
  const { scale, palletteColors } = useTheme()
  const styles = pageStyle(palletteColors, scale)
  const { data } = useGetAddress()
  const navigation = useNavigation<NavigationType>()

  const { mutate: setDefault } = useSetDefaultAddress()
  const { mutate: deleteAddress } = useDeleteAddress()

  const onPressCell = (address: DeliveryAddress) => {
    if (address.isDefault) return
    setDefault(address.id)
  }

  const onMorePress = (address: DeliveryAddress) => {
    Alert.alert(
      address.label.charAt(0).toUpperCase() + address.label.slice(1),
      address.addressLine,
      [
        {
          text: 'Edit',
          onPress: () => navigation.navigate('AddAdress', { screenType: ADD_ADDRESS_TYPE.EDIT }),
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () =>
            Alert.alert('Delete Address', 'Are you sure you want to delete this address?', [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Delete', style: 'destructive', onPress: () => deleteAddress(address.id) },
            ]),
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: palletteColors.background }}>
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
            <View key={address.id} style={{ marginHorizontal: scale.md_16, marginVertical: scale.nano_2 }}>
              <AddressCell
                address={address}
                onMorePress={() => onMorePress(address)}
                onPress={() => onPressCell(address)}
              />
            </View>
          ))
        }
      </ScrollView>
      :
      <View>
        <Text>Not data</Text>
      </View>
      }
    </View>
  )
}

export default ManageAdresses

const pageStyle = (color: palleteColorsType, scale: LayoutScaleType) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: PaletteColors.background
    }
  })
}