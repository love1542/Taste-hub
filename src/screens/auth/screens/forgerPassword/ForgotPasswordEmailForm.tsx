import React from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'
import { Text, View } from 'react-native'
import AppButton from '../../../../components/AppButton'
import BorderLineTextField from '../../../../components/fields/BorderLineTextField'
import { useTheme } from '../../../../constants/theme'
import { EmailForm } from './types'

type Props = {
  form: UseFormReturn<EmailForm>
  isLoading: boolean
  onSubmit: () => void
}

const ForgotPasswordEmailForm = ({ form, isLoading, onSubmit }: Props) => {
  const { palletteColors, typography } = useTheme()

  return (
    <View style={{ gap: 16 }}>
      <Text style={typography.subtitle}>
        Enter the email address linked to your account. We&apos;ll send you a verification code.
      </Text>
      <Controller
        control={form.control}
        name="email"
        render={({ field: { value, onChange } }) => (
          <BorderLineTextField
            title="Email"
            value={value}
            placeholder="Enter your email"
            keyboardType="email-address"
            onChangeText={onChange}
            errorMessage={form.formState.errors.email?.message}
          />
        )}
      />
      <AppButton
        text={isLoading ? 'Sending...' : 'Send verification code'}
        onPress={onSubmit}
        disabled={isLoading}
        colors={[palletteColors.appPrimary, palletteColors.appPrimary]}
        textStyle={[typography.title, { color: palletteColors.white }]}
      />
    </View>
  )
}

export default ForgotPasswordEmailForm
