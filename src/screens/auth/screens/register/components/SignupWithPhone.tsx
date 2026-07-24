import { View, Text } from 'react-native'
import React, { forwardRef, Ref, useImperativeHandle } from 'react'
import { useTheme } from '../../../../../constants/theme'
import { Controller, useForm } from 'react-hook-form'
import BorderLineTextField from '../../../../../components/fields/BorderLineTextField'
import { signupStyles } from '../../../styles'
import { phoneForm, StepHandle } from '../../../types/auth.types'
import { phoneStepSchema } from '../../../../../utilites/validation/authSchema'
import { zodResolver } from '@hookform/resolvers/zod'


const SignupWithPhone = forwardRef<StepHandle<phoneForm>>((
  _props, ref
) => {
  const {palletteColors, scale, typography} = useTheme()
    const styles = signupStyles(palletteColors, scale)

     const { control, formState, handleSubmit, clearErrors } = useForm<phoneForm>({
        resolver: zodResolver(phoneStepSchema),
        defaultValues: {
          phone: ""
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
        value={value ?? ""}
        onChangeText={onChange} 
        errorMessage={formState.errors.phone?.message}/>
      )}/>
      
    </View>
  )
})

export default SignupWithPhone
