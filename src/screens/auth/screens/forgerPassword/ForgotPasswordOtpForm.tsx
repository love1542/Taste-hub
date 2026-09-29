import React from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'
import { Text, TouchableOpacity, View } from 'react-native'
import AppButton from '../../../../components/AppButton'
import OtpFields from '../../../../components/fields/OtpFields'
import ResendOtp from '../../components/ResendOtp'
import { useTheme } from '../../../../constants/theme'
import { OtpForm } from './types'

type Props = {
  form: UseFormReturn<OtpForm>
  email: string
  isLoading: boolean
  onChangeEmail: () => void
  onResend: () => void
  onSubmit: () => void
}

const ForgotPasswordOtpForm = ({ form, email, isLoading, onChangeEmail, onResend, onSubmit }: Props) => {
  const { palletteColors, typography, scale } = useTheme()

  return (
    <View style={{ gap: scale.md_16 }}>
      <Text style={typography.subtitle}>Enter the 6-digit code sent to</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: scale.sm_8 }}>
        <Text style={[typography.title, { flexShrink: 1 }]}>{email}</Text>
        <TouchableOpacity onPress={onChangeEmail} accessibilityRole="button">
          <Text style={[typography.title, { color: palletteColors.appPrimary }]}>Change</Text>
        </TouchableOpacity>
      </View>
      <Controller
        control={form.control}
        name="otp"
        render={({ field: { value, onChange } }) => <OtpFields value={value} onChange={onChange} />}
      />
      {form.formState.errors.otp?.message && (
        <Text style={[typography.subtitle, { color: palletteColors.appPrimary }]}> 
          {String(form.formState.errors.otp.message)}
        </Text>
      )}
      <ResendOtp resendpress={onResend} />
      <AppButton
        text={isLoading ? 'Verifying...' : 'Verify code'}
        onPress={onSubmit}
        disabled={isLoading}
        colors={[palletteColors.appPrimary, palletteColors.appPrimary]}
        textStyle={[typography.title, { color: palletteColors.white }]}
      />
    </View>
  )
}

export default ForgotPasswordOtpForm
