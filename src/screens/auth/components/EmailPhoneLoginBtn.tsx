import { View, StyleSheet } from 'react-native'
import React from 'react'
import LeftIconWithTextButton from '../../../components/LeftIconWithTextButton'
import { Phone, Mail } from 'lucide-react-native'

const EmailPhoneLoginBtn = () => {
  return (
    <View style={styles.container}>
      <LeftIconWithTextButton
        leftIcon={<Phone size={20} color="#000" />}
        text="Continue with Phone"
        style={styles.button}
      />
      <LeftIconWithTextButton
        leftIcon={<Mail size={20} color="#000" />}
        text="Continue with Email"
        style={styles.button}
      />
    </View>
  )
}

export default EmailPhoneLoginBtn

const styles = StyleSheet.create({
  container: {
    gap: 12,
    width: '100%',
  },
  button: {
    marginBottom: 12,
  },
})