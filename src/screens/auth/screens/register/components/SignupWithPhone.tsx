import { View, Text } from 'react-native'
import React from 'react'
import { useTheme } from '../../../../../constants/theme'
import { useFormContext, Controller } from 'react-hook-form'
import BorderLineTextField from '../../../../../components/fields/BorderLineTextField'
import { signupStyles } from '../../../styles'
import { SignupForm } from '../../../types/auth.types'

const SignupWithPhone = () => {
  const { control, formState } = useFormContext<SignupForm>()
  const {palletteColors, scale, typography} = useTheme()
    const styles = signupStyles(palletteColors, scale)
  return (
    <View style={{ width: '100%', gap: 6 }}>
      <Text style={typography.subHeading}>
        Sign up with Phone
      </Text>

      <Text>Enter your details. New users are created automatically.</Text>

      <Controller 
      name='phone'
      control={control}
      render={({field: {value, onChange}}) =>(
        <BorderLineTextField
        placeholder='Enter Phone Number'
        title='phone'
        value={value}
        onChangeText={onChange} 
        errorMessage={formState.errors.phone?.message}/>
      )}/>
      
    </View>
  )
}

export default SignupWithPhone
