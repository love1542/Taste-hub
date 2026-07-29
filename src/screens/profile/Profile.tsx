import { View, Text, Button } from 'react-native'
import React from 'react'
import { useAuth } from '../../hooks'

const Profile = () => {
const { logout} = useAuth()

  return (
    <View style={{flex:1,justifyContent:'center'}}>
      <Button title='Logout' onPress={logout}/>
    </View>
  )
}

export default Profile