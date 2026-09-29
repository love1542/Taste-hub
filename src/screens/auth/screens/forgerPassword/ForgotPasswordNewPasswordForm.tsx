import React from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'
import { Text, View } from 'react-native'
import AppButton from '../../../../components/AppButton'
import BorderLineTextField from '../../../../components/fields/BorderLineTextField'
import { useTheme } from '../../../../constants/theme'
import { PasswordForm } from './types'

type Props = {
  form: UseFormReturn<PasswordForm>
  isLoading: boolean
  onSubmit: () => void
}

const ForgotPasswordNewPasswordForm = ({ form, isLoading, onSubmit }: Props) => {
  const { palletteColors, typography, scale } = useTheme()

  return (
    <View style={{ gap: scale.md_16 }}>
      <Text style={typography.subtitle}>Choose a new password for your account.</Text>
      <Controller
        control={form.control}
        name="newPassword"
        render={({ field: { value, onChange } }) => (
          <BorderLineTextField
            title="New password"
            value={value}
            placeholder="Enter your new password"
            isSecureField
            onChangeText={onChange}
            errorMessage={form.formState.errors.newPassword?.message}
          />
        )}
      />
      <Controller
        control={form.control}
        name="confirmPassword"
        render={({ field: { value, onBlur } }) => (
          <BorderLineTextField
            title="Confirm password"
            value={value}
            placeholder="Confirm your new password"
            isSecureField
            onChangeText={(text) => form.setValue('confirmPassword', text, {
              shouldDirty: true,
              shouldValidate: true,
            })}
            onBlur={onBlur}
            errorMessage={form.formState.errors.confirmPassword?.message}
          />
        )}
      />
      <AppButton
        text={isLoading ? 'Updating...' : 'Update password'}
        onPress={onSubmit}
        disabled={isLoading}
        colors={[palletteColors.appPrimary, palletteColors.appPrimary]}
        textStyle={[typography.title, { color: palletteColors.white }]}
      />
    </View>
  )
}

export default ForgotPasswordNewPasswordForm
