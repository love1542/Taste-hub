import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { EmailLoginForm } from '../../../types/auth.types'
import BorderLineTextField from '../../../../../components/fields/BorderLineTextField'
import AppButton from '../../../../../components/AppButton'
import { LayoutScaleType, useTheme } from '../../../../../constants/theme'
import { zodResolver } from '@hookform/resolvers/zod'
import { emailLoginSchema } from '../../../../../utilites/validation/authSchema'
import { useToast } from '../../../../../components/toast'
import { uselogin } from '../../../hooks'
import { RegisterRequest } from '../../../../../api/dto/auth.dto'


const EmailLogin = () => {
  const { palletteColors, scale, typography } = useTheme()
  const styles = emailLoginStyles(scale)
  const { showToast } = useToast()

  const { control, formState, handleSubmit } = useForm<EmailLoginForm>({
    resolver: zodResolver(emailLoginSchema),
    defaultValues: { email: "", password: "" }
  })

  const { mutateAsync, isPending } = uselogin()

  const handleloginPress = () => {
    handleSubmit(async (data) => {
      const request: RegisterRequest = {
        identifier: data.email,
        type: "phone",
        password: data.password
      }
      let response = await mutateAsync(request)
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
    })
  }

  return (
    <View style={styles.emailFieldsWrapper}>
      <Controller
        name='email'
        control={control}
        render={({ field: { value, onChange } }) => {
          return (
            <BorderLineTextField
              title='Email'
              value={value}
              placeholder='Enter your email'
              errorMessage={formState.errors.email?.message}
              onChangeText={onChange}
            />
          )
        }} />

      <Controller
        name='password'
        control={control}
        render={({ field: { value, onChange } }) => {
          return (
            <BorderLineTextField
              title='password'
              value={value}
              placeholder='Enter your password'
              errorMessage={formState.errors.password?.message}
              onChangeText={onChange}
            />
          )
        }} />

      <TouchableOpacity
        style={styles.resetPass}
      >
        <Text style={[typography.subtitle, { color: palletteColors.appPrimary }]}>Forget Password</Text>
      </TouchableOpacity>

      <AppButton
        onPress={handleloginPress}
        disabled={isPending}
        text={isPending ? "loading..." : "login"}
        colors={[palletteColors.appPrimary, palletteColors.appPrimary]}
        textStyle={{ color: palletteColors.white }}
      />
    </View>
  )
}

export default EmailLogin


export const emailLoginStyles = (scale: LayoutScaleType) => {
  return StyleSheet.create({
    emailFieldsWrapper: {
      backgroundColor: "white",
      padding: scale.ml_20,
      gap: scale.ml_20,
      borderRadius: 15
    },
    resetPass: {
      alignSelf: "flex-end"
    }
  })
}