import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '../../../../constants/theme'
import { loginStyles } from '../../styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import SegmentControler from '../../../../components/segmentControler/SegmentControler'
import EmailLogin from './components/EmailLogin'
import PhoneLogin from './components/PhoneLogin'
import SocialLogins from '../../components/SocialLogins'

const Login = () => {
  const {palletteColors} = useTheme()
  const styles = loginStyles(palletteColors)
  const [tab, setTab] = useState<number>(0)

  return (
    <View style={styles.loginWrapper}>
        <SafeAreaView>
          <Text>Welcome back</Text>
          <Text>Login to continue enjoying food in best restarunts.</Text>

          <SegmentControler segments={["Email", "Phone"]} onChange={setTab} selectedIndex={tab}/>
          {
            tab === 0 ? <EmailLogin /> : <PhoneLogin />
          }

          <SocialLogins />
        </SafeAreaView>
    </View>
  )
}

export default Login

