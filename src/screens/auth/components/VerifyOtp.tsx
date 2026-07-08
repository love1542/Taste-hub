import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import OtpFields from '../../../components/fields/OtpFields'
import { useTheme } from '../../../constants/theme'

type VerifyOtpProps = {
  destination: String
}
const VerifyOtp = ({destination}:VerifyOtpProps) => {
  const {scale, typography} = useTheme()
  const [value, setValue] = useState("")
  return (
    <View style={{width: '100%', gap: scale.xxl_40}}>
      <View style={{gap:scale.md_16}}>
          <Text style={typography.heading}>Enter Verification Code</Text>
      <Text style={typography.textField}>Please enter the 6-digit code sent to {destination}.</Text>
      </View>
      

      <OtpFields 
        value= {value}
        onChange = {(value) => setValue(value)}
      />
    </View>
  )
}

export default VerifyOtp

const verifyOtpStyles = () => {
  return StyleSheet.create({
    container:{

    },
  })
}