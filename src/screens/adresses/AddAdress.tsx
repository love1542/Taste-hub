import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Keyboard, TouchableWithoutFeedback, } from 'react-native'
import React, { useState } from 'react'
import { Check } from 'lucide-react-native'
import { useNavigation } from '@react-navigation/native'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import BorderLineTextField from '../../components/fields/BorderLineTextField'
import SingleSelectionChips from '../../components/singleSelection/SignleSelectionChips'
import AppButton from '../../components/AppButton'
import AppHeader from '../../components/AppHeader'
import SearchField from '../../components/searchField/SearchField'
import { useAppBottomSheet } from '../../components/bottomSheet/hooks/useAppBottomSheet'
import { NominatimSearchResponseDto } from '../../dto/location'
import { ADDRESS_LABELS, appRoutes } from '../../constants/appConstants'
import { LayoutScaleType, palleteColorsType, useTheme, } from '../../constants/theme'
import { AppStackParamList } from '../../navigation/type'
import { AddAddressForm, AddressLabel, DeliveryAddress } from './types/adress.type'
import { addAddressSchema, AddAddressFormSchema } from '../../utilites/validation/addressSchema'
import { useAddAddress } from './hooks/mutationHooks'
import SearchLocationSheet from '../../components/SearchLocationSheet'
import { getLocationsWithQuery } from '../../services/locationService'
import { useToast } from '../../components/toast'


type NavigationType = NativeStackNavigationProp<AppStackParamList, typeof appRoutes.addAdress>

const AddAddress = () => {
  const navigation = useNavigation<NavigationType>()
  const { open, close } = useAppBottomSheet()
  const { showToast } = useToast()

  const { scale, palletteColors, typography } = useTheme()
  const styles = addAddressStyles(scale, palletteColors)

  const { mutate } = useAddAddress()

  const [search, setSearch] = useState('')
  const [selectedLabel, setSelectedLabel] = useState<AddressLabel | undefined>('home')
  const [isDefault, setIsDefault] = useState(false)
  const [locationCoords, setLocationCoords] = useState({ lat: 0, lon: 0 })


  const { control, handleSubmit, clearErrors, setValue, formState } = useForm<AddAddressFormSchema>({
    resolver: zodResolver(addAddressSchema),
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

  const fillFormFromLocation = (location: NominatimSearchResponseDto) => {
    const { address } = location

    const addressLine = location.display_name

    const area = address.county ?? address.hamlet ?? address.town ?? address.municipality ?? ''

    const city = address.state_district ?? ''

    const state = address.state ?? ''

    setValue('addressLine', addressLine)
    setValue('area', area)
    setValue('city', city)
    setValue('state', state)
    setLocationCoords({ lat: parseFloat(location.lat), lon: parseFloat(location.lon) })
    setSearch(location.display_name)
  }

  const openAddressSearchSheet = () => {
    open({
      content: (
        <SearchLocationSheet
          locationPress={(location) => {
            fillFormFromLocation(location)
            close()
          }}
        />
      ),
      snapPoints: ['80%'],
      enablePanDownToClose: true,
    })
  }

  const buildAddressPayload = (
    data: AddAddressFormSchema,
    coords: { lat: number; lon: number } = locationCoords,
  ): DeliveryAddress => {
    const now = new Date().toISOString()
    const label = selectedLabel  ?? 'home'

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
      latitude: coords.lat,
      longitude: coords.lon,
      isDefault,
      createdAt: now,
      updatedAt: now,
    }
  }

  const savePress = handleSubmit(
    async (data) => {
      let coords = locationCoords

      if (coords.lat === 0 && coords.lon === 0) {
        try {
          const results = await getLocationsWithQuery(data.addressLine)
          if (results.length > 0) {
            coords = {
              lat: parseFloat(results[0].lat),
              lon: parseFloat(results[0].lon),
            }
          }
        } catch (_) {
          showToast({
            message: 'Try some later',
            type: 'error'
          })
          return
        }
      }

      if (coords.lat !== 0 && coords.lon !== 0) {
        const payload = buildAddressPayload(data, coords)
        navigation.navigate('ConfirmAdress', { address: payload })
      } else {
        showToast({
          message: 'Please check your location',
          type: 'error'
        })
      }
    },
    (errors) => {
      const firstError = Object.values(errors)[0]
      showToast({
        message: firstError?.message ?? 'Please check your inputs',
        type: 'error',
      })
    }
  )


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>

        {/* Header */}
        {/* <View style={styles.headerWrapper}> */}
          <AppHeader
            title="Add Address"
            onBackPress={() => navigation.goBack()}
          />
        {/* </View> */}


        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >

          {/* Search */}
          <SearchField
            value={search}
            placeholder="Search address..."
            onChange={() => { }}
            onClear={() => {
              setSearch('')
              setValue('addressLine', '')
              setValue('area', '')
              setValue('city', '')
              setValue('state', '')
              setValue('postalCode', '')
              setLocationCoords({ lat: 0, lon: 0 })
            }}
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
                  errorMessage={formState.errors.receiverName?.message}
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
                  errorMessage={formState.errors.receiverPhone?.message}
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
                  errorMessage={formState.errors.addressLine?.message}
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
                  errorMessage={formState.errors.area?.message}
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
                  errorMessage={formState.errors.landmark?.message}
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
                  errorMessage={formState.errors.city?.message}
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
                  errorMessage={formState.errors.state?.message}
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
                  errorMessage={formState.errors.postalCode?.message}
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

          <AppButton
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
      backgroundColor: color.background,
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
      backgroundColor: color.background,
    },

  })
}