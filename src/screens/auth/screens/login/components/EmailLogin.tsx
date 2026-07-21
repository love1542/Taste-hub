import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { EmailLoginForm } from '../../../types/auth.types'
import BorderLineTextField from '../../../../../components/fields/BorderLineTextField'
import LeftIconWithTextButton from '../../../../../components/LeftIconWithTextButton'
import { useTheme } from '../../../../../constants/theme'

const EmailLogin = () => {

    const {palletteColors} = useTheme()

    const {control, formState, handleSubmit} = useForm<EmailLoginForm>({

        defaultValues: {email:"", password:""}
    })
  return (
    <View>
      <Controller 
      name='email'
      control={control}
      render={({field:{value,onChange}})=>{
        return(
            <BorderLineTextField
             title='Email'
            value={value}
            placeholder='Enter your email'
            errorMessage={formState.errors.email?.message}
            onChangeText={onChange}
            />
        )
      }}/>

      <Controller 
      name='password'
      control={control}
      render={({field:{value,onChange}})=>{
        return(
            <BorderLineTextField
             title='password'
            value={value}
            placeholder='Enter your password'
            errorMessage={formState.errors.password?.message}
            onChangeText={onChange}
            />
        )
      }}/>

      <TouchableOpacity>
        <Text>Reset Password</Text>
      </TouchableOpacity>

      <LeftIconWithTextButton  
      text='Login'
      colors={[palletteColors.appPrimary, palletteColors.appPrimary2]}
      />
    </View>
  )
}

export default EmailLogin