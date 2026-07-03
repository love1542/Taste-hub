import { View, Text, TouchableOpacity } from 'react-native'
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

  const handleLoginPress = () => {
    console.log('Login pressed')
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <AppIcon />
        <View style={styles.titles}>
          <Text style={typography.heading}>{WECOME_DATA.heading}</Text>
          <Text style={[typography.subtitle, styles.subtitleText]}>{WECOME_DATA.subtitle}</Text>
        </View>
      </View>

      <View style={styles.centerWrapper}>
        <EmailPhoneLoginBtn 
          phoneOnPress={() => console.log('Phone login pressed')}
          emailOnPress={() => console.log('Email login pressed')}
        />
        <View style={styles.socialLoginsWrapper}>
          <Text style={styles.orText}>--- or Continue with ---</Text>
          <SocialLogins
            appleOnPress={() => console.log('Apple login pressed')}
            googleOnPress={() => console.log('Google login pressed')}
          />
        </View>
      </View>

      <View style={styles.loginView}>
        <View style={[typography.borderLine, styles.divider]} />

        <View style={styles.loginRow}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <TouchableOpacity onPress={handleLoginPress}>
            <Text style={styles.loginLink}>Log In</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footerText}>
          By continuing, you agree to our{' '}
          <TouchableOpacity >
            <Text style={styles.linkText}>Terms</Text>
          </TouchableOpacity>
          <Text> and{' '}</Text>
          <TouchableOpacity>
            <Text style={styles.linkText}>Privacy Policy</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </SafeAreaView>
  )
}

export default Welcome