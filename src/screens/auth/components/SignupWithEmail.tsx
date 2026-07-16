import { View, Text, StyleSheet, Image } from 'react-native'
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import BorderLineTextField from '../../../components/fields/BorderLineTextField'
import { Lock, Mail } from 'lucide-react-native'
import { Controller, useForm, useFormContext } from 'react-hook-form'
import { EmailStepForm, SignupForm, StepHandle } from '../types/auth.types'
import { LayoutScaleType, palleteColorsType, useTheme } from '../../../constants/theme'
import LeftIconWithTextButton from '../../../components/LeftIconWithTextButton'
import { zodResolver } from '@hookform/resolvers/zod'
import { emailStepSchema } from '../../../utilites/validation/authSchema'


const SignupWithEmail = forwardRef<StepHandle<EmailStepForm>>((
  _props, ref
) => {
  const { palletteColors, scale, typography } = useTheme()
  const styles = viewStyles(palletteColors, scale)

  const { control, formState, handleSubmit, clearErrors } = useForm<EmailStepForm>({
    resolver: zodResolver(emailStepSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: ""
    },
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
    <View style={styles.box}>
      <View style={{flexDirection: 'row', gap: scale.xs_4}}>
        <LeftIconWithTextButton
          leftIcon={<Mail size={40} color={palletteColors.appPrimary} />}
          colors={[palletteColors.appFFE4D5, 'white']}
          style={{ width: 70, height: 70, margin: 10 }}
        />

        <View style={styles.titlesWrapper}>
          <Text style={typography.subHeading}>
            Sign up with email
          </Text>
          <Text style={typography.subtitle}>Create your account to discover premium restaurants and food</Text>
        </View>
      </View>


      <View style={styles.filedsRapper}>
        <Controller
          control={control}
          name='email'
          render={({ field: { value, onChange } }) => (
            <BorderLineTextField
              title='email'
              placeholder='Enter your Email'
              value={value}
              onChangeText={onChange}
              leftIcon={<Mail size={20} />}
              errorMessage={formState.errors.email?.message}
              onFocus={()=>{
                clearErrors('email')
              }}
            />

          )} />

        <Controller
          control={control}
          name='password'
          render={({ field: { value, onChange } }) => (
            <BorderLineTextField
              title='password'
              placeholder='Enter Password'
              value={value}
              onChangeText={onChange}
              leftIcon={<Lock size={20} />}
              isSecureField={true}
              errorMessage={formState.errors.password?.message}
              onFocus={()=>{
                clearErrors('password')
              }}
            />

          )} />

        <Controller
          control={control}
          name='confirmPassword'
          render={({ field: { value, onChange } }) => (
            <BorderLineTextField
              title='Confrim Password'
              placeholder='Confirm your Password'
              value={value}
              onChangeText={onChange}
              leftIcon={<Lock size={20} />}
              isSecureField={true}
              errorMessage={formState.errors.confirmPassword?.message}
              onFocus={()=>{
                clearErrors('confirmPassword')
              }}
            />

          )} />

      </View>

    </View>
  )
})

export default SignupWithEmail

const viewStyles = (color: palleteColorsType, scale: LayoutScaleType) => {
  return StyleSheet.create({
    box: {
      width: '100%',
      gap: scale.xxl_40,
    },

    filedsRapper: {
      gap: scale.xl_32,
    },

    titlesWrapper: {
      gap: scale.sm_8,
      width: '70%',
      marginTop: scale.xsm_6
    },
  })
}