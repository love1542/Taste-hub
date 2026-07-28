import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import BorderLineTextField from '../../../../../components/fields/BorderLineTextField'
import OtpFields from '../../../../../components/fields/OtpFields'
import { zodResolver } from '@hookform/resolvers/zod'
import { phoneOtpSchema } from '../../../../../utilites/validation/authSchema'
import LeftIconWithTextButton from '../../../../../components/LeftIconWithTextButton'
import { LayoutScaleType, useTheme } from '../../../../../constants/theme'
import ResendOtp from '../../../components/ResendOtp'
import { useloginVerifyOtp, useloginWithPhone } from '../../../hooks'
import { useToast } from '../../../../../components/toast'
import { phoneformOtp } from '../../../types/auth.types'
import { Check } from 'lucide-react-native'


const PhoneLogin = () => {
  const [numberVerify, setNumberVerify] = useState(false)
  const { palletteColors, scale, typography } = useTheme()
  const styles = phoneloginStyles(scale)
  const { showToast } = useToast()
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
        if (response.success) {
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
        if (response.success) {
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

  const onChangePress = () => {
    setNumberVerify(false)
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
        numberVerify ?
          <View style={styles.otpView}>
            <View style={[styles.changeWrapper, { backgroundColor: palletteColors.dullwhite }]}>
              <View style={{ flexDirection: 'row' }}>
                <Check color={palletteColors.green} size={20} strokeWidth={3} />
                <Text> Otp send to {getValues("phone")} </Text>
              </View>
              <TouchableOpacity onPress={onChangePress}>
                <Text style={[typography.subtitle, { color: palletteColors.appPrimary, fontWeight: 'medium' }]}> Change</Text>
              </TouchableOpacity>
            </View>
            <Text style={{ fontSize: scale.ml_20, fontWeight: "700" }}>Enter OTP</Text>
            <Text>Enter the 6-digit code we sent to</Text>

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

            <ResendOtp resendpress={() => { }} />
          </View> :
          <Text style={styles.verifyInfoText}>We will send you a 6-digit OTP to verify your number.</Text>
      }

      <LeftIconWithTextButton
        onPress={loginPress}
        text={numberVerify ? "Verify Otp" : "Login"}
        colors={[palletteColors.appPrimary, palletteColors.appPrimary]}
        textStyle={{ color: palletteColors.white }}
      />

    </View>
  )
}

export default PhoneLogin

const phoneloginStyles = (scale: LayoutScaleType) => {
  return StyleSheet.create({
    container: {
      backgroundColor: "white",
      padding: scale.ml_20,
      gap: scale.md_16,
      borderRadius: 15
    },
    otpView: {
      gap: scale.sm_8
    },
    changeWrapper: {
      flexDirection: 'row',
      padding: scale.sm_8,
      borderRadius: scale.xsm_6,
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    verifyInfoText: {
      fontSize: scale.ms_12
    }
  })
}