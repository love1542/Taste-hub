import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Keyboard, TouchableWithoutFeedback, } from 'react-native'
import React, { useState } from 'react'
import { Check } from 'lucide-react-native'
import { useNavigation } from '@react-navigation/native'
import { Controller, useForm } from 'react-hook-form'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import BorderLineTextField from '../../components/fields/BorderLineTextField'
import SingleSelectionChips from '../../components/singleSelection/SignleSelectionChips'
import LeftIconWithTextButton from '../../components/LeftIconWithTextButton'
import AppHeader from '../../components/AppHeader'
import SearchField from '../../components/searchField/SearchField'
import { useAppBottomSheet } from '../../components/bottomSheet/hooks/useAppBottomSheet'

import { ADDRESS_LABELS, appRoutes } from '../../constants/appConstants'
import { LayoutScaleType, palleteColorsType, useTheme, } from '../../constants/theme'
import { AppStackParamList } from '../../navigation/type'
import { AddAddressForm, AddressLabel, DeliveryAddress } from './types/adress.type'
import { useAddAddress } from './hooks/mutationHooks'
import SearchLocationSheet from '../../components/SearchLocationSheet'


type NavigationType = NativeStackNavigationProp<AppStackParamList, typeof appRoutes.addAdress>

const AddAddress = () => {
  const navigation = useNavigation<NavigationType>()
  const { open, close } = useAppBottomSheet()

  const { scale, palletteColors, typography } = useTheme()
  const styles = addAddressStyles(scale, palletteColors)

  const { mutate } = useAddAddress()

  const [search, setSearch] = useState('')
  const [selectedLabel, setSelectedLabel] = useState<string | undefined>('home')
  const [isDefault, setIsDefault] = useState(false)



  const openAddressSearchSheet = () => {
    open({
      content: (
       <SearchLocationSheet 
        
       />
      ),
      snapPoints: ['100%'],
      enablePanDownToClose: true,
    })
  }

  const { control, handleSubmit, clearErrors } = useForm<AddAddressForm>({
    defaultValues: {
      receiverName: '',
      receiverPhone: '',
      addressLine: '',
      area: '',
      landmark: '',
      city: '',
      state: '',
      postalCode: '',
    },
  })

  const buildAddressPayload = (data: AddAddressForm): DeliveryAddress => {
    const now = new Date().toISOString()
    const label = (selectedLabel as AddressLabel | undefined) ?? 'home'

    return {
      id: `address-${Date.now()}`,
      userId: 'user-1',
      label,
      receiverName: data.receiverName,
      receiverPhone: data.receiverPhone,
      addressLine: data.addressLine,
      area: data.area,
      landmark: data.landmark || undefined,
      city: data.city,
      state: data.state,
      postalCode: data.postalCode || undefined,
      latitude: 0,
      longitude: 0,
      isDefault,
      createdAt: now,
      updatedAt: now,
    }
  }

  const savePress = handleSubmit((data) => {
    mutate(buildAddressPayload(data))
  })


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>

        {/* Header */}
        <View style={styles.headerWrapper}>
          <AppHeader
            title="Add Address"
            onBackPress={() => navigation.goBack()}
          />
        </View>


        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >

          {/* Search */}
          <SearchField
            value={""}
            placeholder="Search address..."
            onChange={() => { }}
            onClear={() => setSearch('')}
            editable={false}
            onPress={openAddressSearchSheet}
          />

          {/* Address Details */}
          <View style={styles.addressSection}>

            <Text style={typography.mdTitle}>
              Address details
            </Text>


            {/* Receiver Name */}
            <Controller
              control={control}
              name="receiverName"
              render={({ field: { onChange, value } }) => (
                <BorderLineTextField
                  title="Receiver Name"
                  placeholder="Enter receiver name"
                  value={value}
                  onChangeText={onChange}
                  onFocus={() => {
                    clearErrors('receiverName')
                  }}
                />
              )}
            />


            {/* Phone */}
            <Controller
              control={control}
              name="receiverPhone"
              render={({ field: { onChange, value } }) => (
                <BorderLineTextField
                  title="Phone Number"
                  placeholder="Enter phone number"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="phone-pad"
                  onFocus={() => {
                    clearErrors('receiverPhone')
                  }}
                />
              )}
            />


            {/* Address */}
            <Controller
              control={control}
              name="addressLine"
              render={({ field: { onChange, value } }) => (
                <BorderLineTextField
                  title="Address"
                  placeholder="House no., street, building"
                  value={value}
                  onChangeText={onChange}
                  onFocus={() => {
                    clearErrors('addressLine')
                  }}
                />
              )}
            />


            {/* Area */}
            <Controller
              control={control}
              name="area"
              render={({ field: { onChange, value } }) => (
                <BorderLineTextField
                  title="Area"
                  placeholder="Enter area"
                  value={value}
                  onChangeText={onChange}
                  onFocus={() => {
                    clearErrors('area')
                  }}
                />
              )}
            />


            {/* Landmark */}
            <Controller
              control={control}
              name="landmark"
              render={({ field: { onChange, value } }) => (
                <BorderLineTextField
                  title="Landmark"
                  placeholder="Enter landmark (optional)"
                  value={value}
                  onChangeText={onChange}
                  onFocus={() => {
                    clearErrors('landmark')
                  }}
                />
              )}
            />


            {/* City */}
            <Controller
              control={control}
              name="city"
              render={({ field: { onChange, value } }) => (
                <BorderLineTextField
                  title="City"
                  placeholder="Enter city"
                  value={value}
                  onChangeText={onChange}
                  onFocus={() => {
                    clearErrors('city')
                  }}
                />
              )}
            />


            {/* State */}
            <Controller
              control={control}
              name="state"
              render={({ field: { onChange, value } }) => (
                <BorderLineTextField
                  title="State"
                  placeholder="Enter state"
                  value={value}
                  onChangeText={onChange}
                  onFocus={() => {
                    clearErrors('state')
                  }}
                />
              )}
            />


            {/* Postal Code */}
            <Controller
              control={control}
              name="postalCode"
              render={({ field: { onChange, value } }) => (
                <BorderLineTextField
                  title="Postal Code"
                  placeholder="Enter postal code"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="number-pad"
                  onFocus={() => {
                    clearErrors('postalCode')
                  }}
                />
              )}
            />

          </View>


          {/* Address Label */}
          <View style={{ marginTop: scale.xl_18 }}>

            <SingleSelectionChips
              title="Save address as"
              configs={ADDRESS_LABELS}
              selectedValue={selectedLabel}
              onSelectionChange={setSelectedLabel}
              scrolling={false}
            />

          </View>


          {/* Default Address */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.defaultAddressRow}
            onPress={() => setIsDefault(!isDefault)}
          >

            <View
              style={[
                styles.checkbox,
                isDefault && styles.checkboxSelected,
              ]}
            >
              {isDefault && (
                <Check
                  size={15}
                  color={palletteColors.white}
                />
              )}
            </View>

            <View style={styles.defaultTextWrapper}>

              <Text style={styles.defaultTitle}>
                Make this my default address
              </Text>

              <Text style={styles.defaultSubtitle}>
                Use this address automatically for delivery
              </Text>

            </View>

          </TouchableOpacity>

        </ScrollView>


        {/* Bottom Save */}
        <View style={styles.saveWrapper}>

          <LeftIconWithTextButton
            text="Save Address"
            onPress={savePress}
            colors={[
              palletteColors.appPrimary,
              palletteColors.appPrimary2,
            ]}
            textStyle={{
              color: palletteColors.white,
            }}
          />

        </View>

      </View>
    </TouchableWithoutFeedback>
  )
}


export default AddAddress


const addAddressStyles = (scale: LayoutScaleType, color: palleteColorsType) => {

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.dullwhite,
    },
    headerWrapper: {
      paddingTop: scale.huge_48,
    },
    scrollContent: {
      paddingHorizontal: scale.md_16,
      paddingTop: scale.md_16,
      paddingBottom: scale.xl_18,
    },

    // Address

    addressSection: {
      marginTop: scale.ms_12,
      gap: scale.md_16,
    },

    // Default

    defaultAddressRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: scale.xl_18,
      marginBottom: scale.md_16,
    },


    checkbox: {
      width: 22,
      height: 22,
      borderRadius: 6,
      borderWidth: 1.5,
      borderColor: color.appA3A3A3,
      alignItems: 'center',
      justifyContent: 'center',
    },


    checkboxSelected: {
      backgroundColor: color.appPrimary,
      borderColor: color.appPrimary,
    },


    defaultTextWrapper: {
      flex: 1,
      marginLeft: scale.md_16,
    },


    defaultTitle: {
      fontSize: scale.md_16,
      fontWeight: '500',
      color: color.black,
    },


    defaultSubtitle: {
      marginTop: scale.nano_2,
      fontSize: scale.ms_12,
      color: color.appA3A3A3,
    },


    // Bottom button

    saveWrapper: {
      paddingHorizontal: scale.md_16,
      paddingBottom: scale.md_16,
      paddingTop: scale.sm_8,
      backgroundColor: color.dullwhite,
    },

  })
}