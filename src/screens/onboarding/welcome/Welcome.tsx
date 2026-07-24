import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import AppIcon from '../../../components/AppIcon'
import { useTheme } from '../../../constants/theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import OnBoardingBackground from '../components/OnBoardingBackground'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../navigation/type'
import { useNavigation } from '@react-navigation/native'
import EmailPhoneLoginBtn from '../../auth/components/EmailPhoneLoginBtn'
import SocialLogins from '../../auth/components/SocialLogins'
import { WECOME_DATA } from '../../auth/constants/data'
import { useWelcomeStyles } from './welcome.styles'

type WelcomeScreenNavigationType = NativeStackNavigationProp<
 RootStackParamList,
  'auth' >

const Welcome = () => {
  const navigation = useNavigation<WelcomeScreenNavigationType>()

  const { palletteColors, scale, typography } = useTheme()
  const styles = useWelcomeStyles(scale, palletteColors, typography)

  const handleLoginPress = () => {
    navigation.replace('auth', { screen: 'login' })
  }

  return (
    <View style={styles.container}>

      {/* Background image with overlay color */}
      <View style={styles.bg}>
      <OnBoardingBackground
        image={require('../../../../assets/images/welcomebg.png')} 
        overlayColor={palletteColors.white}
      />
        </View>

        {/* Content of the Welcome screen */}
      <SafeAreaView >

        {/* logo and titles */}
        <View style={styles.logoContainer}>
          <AppIcon />
         
            <Text style={[typography.subtitle, { color: palletteColors.appPrimary }]}>{WECOME_DATA.welcome}</Text>
             <View style={styles.name}>
              <Text style={[typography.largeheading, { color: palletteColors.black }]}>Taste</Text>
              <Text style={[typography.largeheading, { color: palletteColors.appPrimary }]}>Hub</Text>
            </View>
            
            <Text style={[typography.subtitle, styles.subtitleText]}>{WECOME_DATA.subtitle}</Text>
          
        </View>

        {/* Login buttons */}
        <View style={styles.centerWrapper}>

          <EmailPhoneLoginBtn
            phoneOnPress={() => navigation.replace('auth',{screen:'signup', params:{signupType:'phone'}})}
            emailOnPress={() => navigation.replace('auth',{screen:'signup', params:{signupType:'email'}})}
          />

          <View style={styles.socialLoginsWrapper}>
            <Text style={styles.orText}>--- or Continue with ---</Text>

            <SocialLogins
              appleOnPress={() => console.log('Apple login pressed')}
              googleOnPress={() => console.log('Google login pressed')}
            />
          </View>

        </View>

        {/* login and footer */}
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
    </View>

  )
}

export default Welcome