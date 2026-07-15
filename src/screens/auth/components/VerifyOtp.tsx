import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import OtpFields from '../../../components/fields/OtpFields'
import { LayoutScaleType, useTheme } from '../../../constants/theme'
import { RESEND_TIME } from '../../../constants/appConstants'
import { OtpForm, StepHandle } from '../types/auth.types'
import { otpSchema } from '../../../utilites/validation/authSchema'

type VerifyOtpProps = {
  destination: string
  resendPress: () => void
}

const VerifyOtp = forwardRef<StepHandle<OtpForm>, VerifyOtpProps>((
  { destination, resendPress }, ref
) => {
  const [seconds, setSeconds] = useState(0);

  const { scale, typography, palletteColors } = useTheme();
  const styles = verifyOtpStyles(scale);

  const { control, formState, handleSubmit } = useForm<OtpForm>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: ""
    }
  })

  useEffect(() => {
    if (seconds === 0) return;

    const interval = setInterval(() => {
      setSeconds(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  useImperativeHandle(ref, () => ({
    validate: () =>
      new Promise((resolve) => {
        handleSubmit(
          (data) => resolve(data),  
          () => resolve(null)      
        )()
      })
  }))

  const onResend = () => {
    resendPress();
    setSeconds(RESEND_TIME);
  };

  const formatTime = (time: number) => {
    const sec = String(time).padStart(2, '0');
    return `00:${sec}`;
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../../assets/icons/verifyMsg.png')}
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

      <View style={styles.resendOtpWrapper}>
        <Text style={typography.subtitle}>
          Didn't receive the code?
        </Text>

        {seconds > 0 ? (
          <Text style={[typography.subtitle, { color: palletteColors.appPrimary }]}>
            Resend in {formatTime(seconds)}
          </Text>
        ) : (
          <TouchableOpacity onPress={onResend}>
            <Text style={[typography.subtitle, { color: palletteColors.appPrimary }]}>
              Resend OTP
            </Text>
          </TouchableOpacity>
        )}
      </View>
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