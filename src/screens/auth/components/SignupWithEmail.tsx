import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import BorderLineTextField from '../../../components/fields/BorderLineTextField'
import { Lock, Mail } from 'lucide-react-native'
import { Controller, useFormContext } from 'react-hook-form'
import { SignupForm } from '../types/auth.types'
import { LayoutScaleType, palleteColorsType, useTheme } from '../../../constants/theme'
import LeftIconWithTextButton from '../../../components/LeftIconWithTextButton'

const SignupWithEmail = () => {
  const { control, formState } = useFormContext<SignupForm>()
  const { palletteColors, scale, typography } = useTheme()
  const styles = viewStyles(palletteColors, scale)
  return (
    <View style={styles.box}>
      <Image source={require('../../../../assets/icons/appIcon.png')} style={styles.img}/>
        <LeftIconWithTextButton 
          leftIcon = {<Mail  size={30} color={palletteColors.appPrimary}/>}
          colors={['white', 'white']}
          style={{width:60, height:60, marginBottom: -15, margin: 10}}
        />

      <View style={styles.titlesWrapper}>
        <Text style={typography.subHeading}>
          Sign up with email
        </Text>
        <Text style={typography.subtitle}>Enter your details. New users are created automatically.</Text>
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
              leftIcon={<Mail size={20}/>}
              errorMessage={formState.errors.email?.message}
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
              leftIcon={<Lock size={20}/>}
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
      gap: scale.xxl_40,
    },

    filedsRapper: {
      gap: scale.lg_24,
      paddingTop: scale.ml_20
    },

    titlesWrapper: {
      gap: scale.md_16
    },
    img:{
      height: 130,
      width: 130,
      position: 'absolute',
      top: 0,
      right:10
    }
  })
}