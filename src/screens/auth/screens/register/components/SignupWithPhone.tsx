import { View, Text, StyleSheet } from 'react-native'
import React, { forwardRef, Ref, useImperativeHandle } from 'react'
import { LayoutScaleType, useTheme } from '../../../../../constants/theme'
import { Controller, useForm } from 'react-hook-form'
import BorderLineTextField from '../../../../../components/fields/BorderLineTextField'
import { signupStyles } from '../../../styles'
import { phoneForm, StepHandle } from '../../../types/auth.types'
import { phoneStepSchema } from '../../../../../utilites/validation/authSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import LeftIconWithTextButton from '../../../../../components/LeftIconWithTextButton'
import { Phone } from 'lucide-react-native'


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
    <View style={{ width: '100%', gap: scale.xxl_40, }}>
      <View style={{flexDirection: 'row', gap: scale.xs_4}}>
        <LeftIconWithTextButton
          leftIcon={<Phone size={38} color={palletteColors.appPrimary} />}
          colors={[palletteColors.appFFE4D5, 'white']}
          style={{ width: 70, height: 70, margin: 10 }}
        />

        <View style={styles.titlesWrapper}>
          <Text style={typography.subHeading}>
            Sign up with phone
          </Text>
          <Text style={typography.subtitle}>Create your account to discover premium restaurants and food</Text>
        </View>
      </View>

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
