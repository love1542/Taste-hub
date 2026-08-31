import { View, StyleSheet } from 'react-native'
import React from 'react'
import AppButton from '../../../components/AppButton'
import { Apple, Mail } from 'lucide-react-native'
import { width } from '../../../constants/theme'

type SocialLoginsProps = { 
  appleOnPress?: () => void
  googleOnPress?: () => void
}

const SocialLogins = ({ appleOnPress, googleOnPress }: SocialLoginsProps) => {
  return (
    <View style={styles.container}>
      <AppButton
        leftIcon={<Apple size={20} color="#000" />}
        text="Apple"
        style={styles.button}
        onPress={appleOnPress}
      />
      <AppButton
        leftIcon={<Mail size={20} color="#000" />}
        text="Google"
        style={styles.button}
        onPress={googleOnPress}
      />
    </View>
  )
}

export default SocialLogins

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    width: width / 2.5,
  },
})