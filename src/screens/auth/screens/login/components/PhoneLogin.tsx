import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import BorderLineTextField from '../../../../../components/fields/BorderLineTextField'
import OtpFields from '../../../../../components/fields/OtpFields'
import { zodResolver } from '@hookform/resolvers/zod'
import { otpSchema, phoneOtpSchema } from '../../../../../utilites/validation/authSchema'
import LeftIconWithTextButton from '../../../../../components/LeftIconWithTextButton'
import { LayoutScaleType, useTheme } from '../../../../../constants/theme'
import ResendOtp from '../../../components/ResendOtp'
import { useloginVerifyOtp, useloginWithPhone } from '../../../hooks'
import { useToast } from '../../../../../components/toast'
import {loginUserStorage, phoneformOtp} from '../../../types/auth.types'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../../../navigation/type'
import  { useNavigation } from '@react-navigation/native'
import { STORAGE_KEYS, storageService } from '../../../../../services/storageService'

type NavigationType = NativeStackNavigationProp<RootStackParamList, "auth">

const PhoneLogin = () => {
  const navigation = useNavigation<NavigationType>()
  const [numberVerify, setNumberVerify] = useState(false)
  const { palletteColors, scale, typography } = useTheme()
  const styles = phoneloginStyles(scale)
  const {showToast} = useToast()
  const verifyNumber = useloginWithPhone()
  const verifyotp = useloginVerifyOtp()

  const { control, getValues, formState, trigger } = useForm<phoneformOtp>({
    resolver: zodResolver(phoneOtpSchema),
    values: { phone: "", otp: "" }
  })

  const loginPress = async () => {
    if (!numberVerify) {
      let verify = await trigger('phone')
      if (verify) {
        let response = await verifyNumber.mutateAsync(getValues("phone"))
        if(response.success) {
           setNumberVerify(true)
          showToast({
            message: response.message,
            type: 'success'
          })
        } else {
          showToast({
            message: response.message,
            type: 'error'
          })
        }
       
      }
    } else {
      let verify = await trigger('otp')
      if (verify) {
        let response = await verifyotp.mutateAsync({
          otp: getValues('otp'),
          phone: getValues("phone")
        })
        if(response.success){

          storageService.set<loginUserStorage>(STORAGE_KEYS.loginUser, response.data as loginUserStorage)
          navigation.replace('auth', {screen: 'home'})

          showToast({
            message: response.message,
            type: 'success'
          })
        } else {
          showToast({
            message: response.message,
            type: 'error'
          })
        }
      }
    }
  }


  return (
    <View style={styles.container}>
      <Controller
        name='phone'
        control={control}
        render={({ field: { value, onChange } }) => {
          return (
            <BorderLineTextField
              title='Phone'
              value={value}
              placeholder='Enter your phone'
              disabled={numberVerify}
              errorMessage={formState.errors.phone?.message}
              onChangeText={onChange}
            />
          )
        }} />

      {
        numberVerify &&
        <View style={styles.otpView}>
          <Text style={[typography.title, {color: palletteColors.appPrimary}]}>Enter OTP</Text>
          <Text>Enter the 6-digit code we sent to</Text>
          <View style={{flexDirection:'row', gap: 5}}>
          <Text>{getValues("phone")}</Text>
          <TouchableOpacity>
            <Text style={[typography.subtitle,{color:palletteColors.appPrimary, fontWeight: '500'}]}> Change ?</Text>
          </TouchableOpacity>
          </View>
          <Controller
            name='otp'
            control={control}
            render={({ field: { value, onChange } }) => {
              return (
                <OtpFields
                  value={value}
                  onChange={onChange}
                />

              )
            }} />

          <ResendOtp resendpress={() => {}}/>
        </View>
      }

      <LeftIconWithTextButton
        onPress={loginPress}
        text={numberVerify ? "Verify Otp" : "Login"}
        colors={[palletteColors.appPrimary, palletteColors.appPrimary]}
        textStyle={{color: palletteColors.white}}
      />

    </View>
  )
}

export default PhoneLogin

const phoneloginStyles = (scale: LayoutScaleType) => {
  return StyleSheet.create({
    container: {
      gap: scale.ml_20
    },
    otpView: {
      gap: scale.sm_8
    }
  })
}