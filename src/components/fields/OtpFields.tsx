import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
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
    const {scale} = useTheme()
    const styles = fieldsStyles(scale)

    const otp = value.split('')
    console.log(otp)

  return (
    <View style={styles.container}>
      {
        [0,1,2,3,4,5].map(index =>(
          <View style={styles.cell}
          key={index}>
            <BorderLineTextField 
             title=''
             onChangeText={onChange}
             value={otp[index]}
             textStyles={{fontSize: scale.xl_32}}
             />
          </View>
        )
        )
      }
    </View>
  )
}

export default OtpFields

const fieldsStyles = (scale: LayoutScaleType) =>{
    return StyleSheet.create({
        container:{
          width:'100%',
            flexDirection: 'row',
            gap: scale.ml_20,
            justifyContent:'center'
        },
        cell:{
            width: scale.avatarSM_40,
        }
    })
}