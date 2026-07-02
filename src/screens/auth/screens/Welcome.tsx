import { View, Text } from 'react-native'
import React from 'react'
import AppIcon from '../../../components/AppIcon'
import { useTheme } from '../../../constants/theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import { WECOME_DATA } from '../data/data'
import { useWelcomeStyles } from '../styles'
import EmailPhoneLoginBtn from '../components/EmailPhoneLoginBtn'
import SocialLogins from '../components/SocialLogins'

const Welcome = () => {
  const { palletteColors, scale, typography } = useTheme()
  const styles = useWelcomeStyles(scale, palletteColors, typography)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <AppIcon />
        <Text style={typography.heading}>{WECOME_DATA.heading}</Text>
        <Text style={[typography.subtitle, { paddingHorizontal: scale.lg_24 }]}>{WECOME_DATA.subtitle}</Text>
      </View>

        <View style={styles.centerWrapper}>
<EmailPhoneLoginBtn />
<Text> --- or Continue with --- </Text>
<SocialLogins />
          </View>
      
<View style={styles.loginView}>
    <View style={[typography.borderLine]} />
    <Text>
      Already have an account? Log In
    </Text>
    <Text>
      By continuing, you agree to our Terms and Privacy Policy.
    </Text>
  </View>
    </SafeAreaView>
  )
}

export default Welcome