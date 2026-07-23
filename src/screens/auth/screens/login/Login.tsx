import { View, Text, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '../../../../constants/theme'
import { loginStyles } from '../../styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import SegmentControler from '../../../../components/segmentControler/SegmentControler'
import EmailLogin from './components/EmailLogin'
import PhoneLogin from './components/PhoneLogin'
import SocialLogins from '../../components/SocialLogins'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AuthStackParamList } from '../../../../navigation/type'
import { useNavigation } from '@react-navigation/native'

type NavigatonProps = NativeStackNavigationProp<AuthStackParamList, 'login'>

const Login = () => {
  const navigation = useNavigation<NavigatonProps>()
  const {palletteColors, scale, typography} = useTheme()
  const styles = loginStyles(palletteColors, scale)
  const [tab, setTab] = useState<number>(0)

  const onSignupPress = () =>{
    navigation.replace('signup', {signupType: 'email'})
  }

  return (
        <SafeAreaView style={styles.loginWrapper}>
          <View style={{gap:scale.sm_8}}>
            <Text style={typography.subHeading}>Welcome back  🥳</Text>
          <Text style={typography.subtitle}>Login to continue enjoying food in best restarunts.</Text>
          </View>

          <SegmentControler segments={["Email", "Phone"]} onChange={setTab} selectedIndex={tab}/>
          {
            tab === 0 ? <EmailLogin /> : <PhoneLogin />
          }

          <View style={styles.socialLoginsWrapper}>
            <Text style={styles.orText}>--- or Continue with ---</Text>

            <SocialLogins
              appleOnPress={() => console.log('Apple login pressed')}
              googleOnPress={() => console.log('Google login pressed')}
            />
          </View>
          <View style={styles.signupRow}>
                      <Text style={styles.signupText}>Aleardy have an account</Text>
                      <TouchableWithoutFeedback onPress={onSignupPress}>
                        <Text style={styles.signupLink}>Sign up</Text>
                      </TouchableWithoutFeedback>
                    </View>
        </SafeAreaView>
  )
}

export default Login

