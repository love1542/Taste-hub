import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import BorderLineTextField from '../../../../../components/fields/BorderLineTextField'
import OtpFields from '../../../../../components/fields/OtpFields'
import { zodResolver } from '@hookform/resolvers/zod'
import { otpSchema, phoneSchema } from '../../../../../utilites/validation/authSchema'
import LeftIconWithTextButton from '../../../../../components/LeftIconWithTextButton'
import { useTheme } from '../../../../../constants/theme'

type phoneform = {
  phone: string
}

type otpForm = {
  otp: string
}
const PhoneLogin = () => {
  const [numberVerify, setNumberVerify] = useState(true)
  const {palletteColors} = useTheme()

  const { control, getValues, formState } = useForm<phoneform>({
    resolver: zodResolver(phoneSchema),
    values: { phone: "" }
  })

  const { control: otpcontroler, formState: otpState } = useForm<otpForm>({
    resolver: zodResolver(otpSchema),
    values: { otp: "" }
  })
  return (
    <View>
      <Controller
        name='phone'
        control={control}
        render={({ field: { value, onChange } }) => {
          return (
            <BorderLineTextField
              title='Phone'
              value={value}
              placeholder='Enter your phone'
              errorMessage={formState.errors.phone?.message}
              onChangeText={onChange}
            />
          )
        }} />

      {
        numberVerify &&
        <View style={{height:150}}>
          <Text>Enter OTP</Text>
          <Text>Enter the 6-digit code we sent to</Text>
          <Text>{getValues("phone")}</Text>
          <Controller
            name='otp'
            control={otpcontroler}
            render={({ field: { value, onChange } }) => {
              return (
                     <OtpFields
                  value={value}
                  onChange={onChange}
                />
               
              )
            }} />


        </View>
      }

       <LeftIconWithTextButton  
      text='Login'
      colors={[palletteColors.appPrimary, palletteColors.appPrimary2]}
      />

    </View>
  )
}

export default PhoneLogin