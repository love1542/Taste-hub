import { View, StyleSheet } from 'react-native'
import React from 'react'
import LeftIconWithTextButton from '../../../components/LeftIconWithTextButton'
import { Phone, Mail, ChevronRight } from 'lucide-react-native'
import { LayoutScaleType, palleteColorsType, TypographyType, useTheme } from '../../../constants/theme'


type EmailPhoneLoginBtnProps = {
  phoneOnPress?: () => void
  emailOnPress?: () => void
}
const EmailPhoneLoginBtn = ({ phoneOnPress, emailOnPress }: EmailPhoneLoginBtnProps) => {
  const { palletteColors, scale, typography } = useTheme()
  const styles = emailPhoneLoginBtnStyles(palletteColors, scale, typography)
  return (
    <View style={styles.container}>
      <LeftIconWithTextButton
        leftIcon={<Phone size={20} color={palletteColors.white} />}
        rightIcon={<ChevronRight size={20} color={palletteColors.white} />}
        text="Continue with Phone"
        style={styles.button}
        colors={[palletteColors.appFFB88A, palletteColors.appPrimary]}
        textStyle={styles.phoneText}
        onPress={phoneOnPress}
      />
      <LeftIconWithTextButton
        leftIcon={<Mail size={20} color={palletteColors.black} />}
        rightIcon={<ChevronRight size={20} color={palletteColors.black} />}
        text="Continue with Email"
        style={styles.button}
        colors={[palletteColors.white, palletteColors.appD4D4D4]}
        textStyle={styles.emailText}
        onPress={emailOnPress}
      />
    </View>
  )
}

export default EmailPhoneLoginBtn

const emailPhoneLoginBtnStyles =  ( colors: palleteColorsType, scale: LayoutScaleType, typography: TypographyType) => {
  return StyleSheet.create({
  container: {
    gap: scale.ms_12,
    width: '90%',
  },
  button: {
    width: '90%',
    marginBottom: scale.ms_12,
    justifyContent: 'space-between',
    paddingRight: scale.sm_8,
  },
  phoneText:{
    ...typography.title,
    color: colors.white,
  }, 
  emailText:{
    ...typography.subtitle,
    color: colors.black
  }
})

}