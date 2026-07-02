import { View, StyleSheet } from 'react-native'
import React from 'react'
import LeftIconWithTextButton from '../../../components/LeftIconWithTextButton'
import { Apple, Mail } from 'lucide-react-native'
import { width } from '../../../constants/theme'



const SocialLogins = () => {
  return (
    <View style={styles.container}>
      <LeftIconWithTextButton
        leftIcon={<Apple size={20} color="#000" />}
        text="Apple"
        style={styles.button}
      />
      <LeftIconWithTextButton
        leftIcon={<Mail size={20} color="#000" />}
        text="Google"
        style={styles.button}
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