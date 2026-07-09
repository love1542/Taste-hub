import { View, Text, StyleSheet, TextInput, TextInputKeyPressEvent } from 'react-native'
import React, { useRef, useState } from 'react'
import { LayoutScaleType, useTheme } from '../../constants/theme'
import BorderLineTextField from './BorderLineTextField'


type OtpFieldsProps = {
  value: string,
  onChange: (value: string) => void
}
const OtpFields = ({
  value,
  onChange
}: OtpFieldsProps) => {
  const { scale, typography } = useTheme()
  const styles = fieldsStyles(scale)
  const inputRefs = useRef<(TextInput | null)[]>([])

  const otp = value.split('')
  console.log(otp)

  const onchangeValue = (text: string, index: number) => {
    const cleanText = text.slice(-1)

    let newOtp = [...otp]
    newOtp[index] = cleanText
    let data = newOtp.join('')
    onChange(data)

    if(cleanText && index < 5){
      inputRefs.current[index + 1]?.focus()
    }
  }

  const onKeyPress = (key:TextInputKeyPressEvent, index: number) => {
    if(key.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  return (
    <View style={styles.container}>
      {
        [0, 1, 2, 3, 4, 5].map(index => (
          <View style={styles.cell}
            key={index}>
            <BorderLineTextField
              ref={(el: any) => (inputRefs.current[index] = el)}
              title=''
              onChangeText={(value: string) => onchangeValue(value, index)}
              value={otp[index]}
              textStyles={{ fontSize: scale.iconMD_24 }}
              fixedLength={1}
              keyboardType='number-pad'
              onKeyPress={(e) => onKeyPress(e, index)}
              borderSyles={(value.length > index) ? typography.focusFiledBorder : typography.borderLine}
            />
          </View>
        )
        )
      }
    </View>
  )
}

export default OtpFields

const fieldsStyles = (scale: LayoutScaleType) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      gap: scale.md_16,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cell: {
      flex: 1,
    }
  })
}