import { View, Text, StyleSheet, Image } from 'react-native'
import React, { forwardRef, useImperativeHandle } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import OtpFields from '../../../../../components/fields/OtpFields'
import { LayoutScaleType, useTheme } from '../../../../../constants/theme'
import { OtpForm, StepHandle } from '../../../types/auth.types'
import { otpSchema } from '../../../../../utilites/validation/authSchema'
import ResendOtp from '../../../components/ResendOtp'

type VerifyOtpProps = {
  destination: string
  resendPress: () => void
}

const VerifyOtp = forwardRef<StepHandle<OtpForm>, VerifyOtpProps>((
  { destination, resendPress }, ref
) => {
  const { scale, typography, palletteColors } = useTheme();
  const styles = verifyOtpStyles(scale);

  const { control, formState, handleSubmit } = useForm<OtpForm>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: ""
    }
  })

  useImperativeHandle(ref, () => ({
    validate: () =>
      new Promise((resolve) => {
        handleSubmit(
          (data) => resolve(data),
          () => resolve(null)
        )()
      })
  }))

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../../../../assets/icons/verifyMsg.png')}
        style={styles.icon}
      />

      <View style={{ gap: scale.sm_8, alignItems: 'center' }}>
        <Text style={typography.title}>Enter Verification Code</Text>

        <Text style={typography.subtitle}>
          Please enter the 6-digit code sent to
        </Text>

        <Text style={[typography.subtitle, { color: palletteColors.appPrimary }]}>
          {destination}
        </Text>
      </View>

      <View style={styles.otpfields}>
        <Controller
          control={control}
          name='otp'
          render={({ field: { value, onChange } }) => (
            <OtpFields
              value={value}
              onChange={onChange}
            />
          )} />

      </View>
      <ResendOtp resendpress={resendPress} />

    </View>
  );
});

export default VerifyOtp

const verifyOtpStyles = (scale: LayoutScaleType) => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    icon: {
      height: 150,
      width: 120,
      alignSelf: 'center'
    },
    otpfields: {
      paddingVertical: scale.xxl_40
    },
    resendOtpWrapper: {
      flexDirection: 'row',
      gap: scale.sm_8,
      justifyContent: 'center',
      paddingTop: scale.ms_12
    }
  })
}