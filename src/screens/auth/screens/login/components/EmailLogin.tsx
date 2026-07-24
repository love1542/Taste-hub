import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { EmailLoginForm, loginUserStorage } from '../../../types/auth.types'
import BorderLineTextField from '../../../../../components/fields/BorderLineTextField'
import LeftIconWithTextButton from '../../../../../components/LeftIconWithTextButton'
import { LayoutScaleType, useTheme } from '../../../../../constants/theme'
import { zodResolver } from '@hookform/resolvers/zod'
import { emailLoginSchema } from '../../../../../utilites/validation/authSchema'
import { useToast } from '../../../../../components/toast'
import { STORAGE_KEYS, storageService } from '../../../../../services/storageService'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../../../navigation/type'
import { useEmailLogin } from '../../../hooks'

type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'auth'>

const EmailLogin = () => {
  const navigation = useNavigation<NavigationProps>()
  const { palletteColors, scale, typography } = useTheme()
  const styles = emailLoginStyles(scale)
  const {showToast} = useToast()

  const { control, formState, handleSubmit } = useForm<EmailLoginForm>({
    resolver: zodResolver(emailLoginSchema),
    defaultValues: { email: "", password: "" }
  })

  const {mutateAsync, isPending} = useEmailLogin()

  const handleloginPress = () => {
    handleSubmit(async (data) => {
      const response = await mutateAsync(data)
      if (response.success === true) {
        showToast({
          message: response.message,
          type: 'success'
        })
        storageService.set<loginUserStorage>(STORAGE_KEYS.loginUser, response.data as loginUserStorage)
      
        navigation.replace('auth', {screen: 'home'})
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
        <Text style={[typography.subtitle, {color: palletteColors.appPrimary}]}>Forget Password</Text>
      </TouchableOpacity>

      <LeftIconWithTextButton
        onPress={handleloginPress}
        disabled={isPending}
        text={isPending ? "loading..." : "login"}
        colors={[palletteColors.appPrimary, palletteColors.appPrimary]}
        textStyle={{color: palletteColors.white}}
      />
    </View>
  )
}

export default EmailLogin


export const emailLoginStyles = (scale: LayoutScaleType) =>{
  return StyleSheet.create({
    emailFieldsWrapper:{
      gap: scale.ml_20,
    },
    resetPass:{
      alignSelf:"flex-end"
    }
  })
}