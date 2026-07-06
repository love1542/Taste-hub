import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import BorderLineTextField from '../../../components/fields/BorderLineTextField'
import { Lock, Mail } from 'lucide-react-native'
import { Controller, useFormContext } from 'react-hook-form'
import { SignupForm } from '../types/auth.types'
import { LayoutScaleType, palleteColorsType, useTheme } from '../../../constants/theme'

const SignupWithEmail = () => {
  const { control, formState } = useFormContext<SignupForm>()
  const { palletteColors, scale, typography } = useTheme()
  const styles = viewStyles(palletteColors, scale)
  return (
    <View style={styles.box}>

      <View style={styles.titlesWrapper}>
        <Text style={typography.heading}>
          Sign up with email
        </Text>
        <Text style={typography.textField}>Enter your details. New users are created automatically.</Text>
      </View>
      
      <View style={styles.filedsRapper}>
        <Controller
          control={control}
          name='email'
          render={({ field: { value, onChange } }) => (
            <BorderLineTextField
              title='email'
              value={value}
              onChangeText={onChange}
              leftIcon={<Mail />}
              errorMessage={formState.errors.email?.message}
            />

          )} />

        <Controller
          control={control}
          name='password'
          render={({ field: { value, onChange } }) => (
            <BorderLineTextField
              title='password'
              value={value}
              onChangeText={onChange}
              leftIcon={<Lock />}
              isSecureField={true}
              errorMessage={formState.errors.password?.message}
            />

          )} />

      </View>

    </View>
  )
}

export default SignupWithEmail

const viewStyles = (color: palleteColorsType, scale: LayoutScaleType) => {
  return StyleSheet.create({
    box: {
      width: '100%',
      gap: scale.xxl_40
    },

    filedsRapper: {
      gap: scale.lg_24
    },

    titlesWrapper: {
      gap: scale.md_16
    }
  })
}