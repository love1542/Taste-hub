import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useId, useState } from 'react'
import { useAuth } from '../../hooks'
import { LayoutScaleType, palleteColorsType, useTheme } from '../../constants/theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import ImagePicker from '../../components/imagePicker/ImagePicker'
import { PickedImage } from '../../components/imagePicker/types/imagePicker.types'
import { CalendarDays, Home, LockKeyhole, LogOut, LucideEdit, Mail, MapPin, Pencil, PersonStanding, Phone, UserRound, VenusAndMars } from 'lucide-react-native'
import AccountInfoCell from './components/AccountInfoCell'
import { useGetProfile } from './hooks/useQueries'
import { STORAGE_KEYS, storageService } from '../../services/storageService'
import { loginUserStorage } from '../auth/types/auth.types'

const Profile = () => {
  const { logout } = useAuth()
  const { palletteColors, scale, typography } = useTheme()
  const styles = profileStyle(palletteColors, scale)
  const [image, setImage] = useState<PickedImage | undefined>(undefined)
  const [id, setId] = useState('')
  const { data } = useGetProfile(id)

  useEffect(() => {
    const getUserId = async () => {
      try {
        const userToken = await storageService.get<loginUserStorage>(STORAGE_KEYS.loginUser)
        setId(userToken?.userId ?? '')
      } catch (error) {
        console.log(error)
      }
    }

    getUserId()
  }, [])

  if (!data?.data) {
    return <Text>Not PRofile fount</Text>
  }

  return (
    <ScrollView
    showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 70,
      }}>
    <SafeAreaView style={styles.container}>
      <View style={{ alignSelf: 'center' }}>
        <ImagePicker
          onCameraPress={() => { }}
          image={data.data.image}
        />
      </View>

      <View
        style={[
          typography.rowCenter,
          {
            width: '100%',
            justifyContent: 'space-between',
          },
        ]}
      >
        <Text style={typography.subHeading}>Personal Information</Text>

        <Pencil
          size={20}
          color={palletteColors.appPrimary}
        />
      </View>


      <View style={[typography.shadowCard, { gap: scale.md_16, },]}>
        <AccountInfoCell
          icon={UserRound}
          title="Full Name"
          value={data.data.fullName}
        />

          <View style={typography.borderLine} />


        {data.data.email && (
          <AccountInfoCell
            icon={Mail}
            title="Email Address"
            value={data.data.email}
          />

        )}

         {data.data.email && <View style={typography.borderLine} /> }

        {data.data.phone && (
          <AccountInfoCell
            icon={Phone}
            title="Phone Number"
            value={data.data.phone}
          />
        )}

        <View style={typography.borderLine} />

        <AccountInfoCell
          icon={VenusAndMars}
          title="Gender"
          value={data.data.gender}
        />

        <View style={typography.borderLine} />

        <AccountInfoCell
          icon={CalendarDays}
          title="Date of Birth"
          value={data.data.dateOfBirth}
        />
      </View>

      {/* Settings */}
      <Text style={typography.subHeading}>
        Settings
      </Text>

      <View
        style={[
          typography.shadowCard,
          {
            gap: scale.md_16,
          },
        ]}
      >
        <AccountInfoCell
          icon={MapPin}
          title="Manage Addresses"
          onpress={() => console.log('open addresses')}
        />

        {data.data.email && (
          <AccountInfoCell
            icon={LockKeyhole}
            title="Change Password"
            onpress={() => console.log('change password')}
          />
        )}
      </View>

      {/* Account */}
      <Text style={typography.subHeading}>
        Account
      </Text>

      <View
        style={[typography.shadowCard, { gap: scale.md_16, },]}>
        <AccountInfoCell
          icon={LogOut}
          title="Log Out"
          onpress={logout}
        />
      </View>
    </SafeAreaView>
    </ScrollView>
  );
}

export default Profile

const profileStyle = (color: palleteColorsType, scale: LayoutScaleType) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.dullwhite,
      paddingHorizontal: scale.md_16,
      gap: scale.ml_20
    }
  })
}