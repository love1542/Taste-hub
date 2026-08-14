import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import React from 'react'
import { useAuth } from '../../hooks'
import { LayoutScaleType, palleteColorsType, useTheme } from '../../constants/theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import ImagePicker from '../../components/imagePicker/ImagePicker'
import { CalendarDays, LockKeyhole, LogOut, Mail, MapPin, Pencil, Phone, UserRound, VenusAndMars } from 'lucide-react-native'
import AccountInfoCell from './components/AccountInfoCell'
import { useGetProfile } from './hooks/useQueries'
import { GENDER_SELECTIONS } from '../../constants/appConstants/helper'
import IconButton from '../../components/IconButton'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AppStackParamList } from '../../navigation/type'
import { useNavigation } from '@react-navigation/native'
import { appRoutes } from '../../constants/appConstants'

type NavigationType = NativeStackNavigationProp<AppStackParamList, 'EditProfile'>

const Profile = () => {
  const { logout } = useAuth()
  const navigation = useNavigation<NavigationType>()
  const { palletteColors, scale, typography } = useTheme()
  const styles = profileStyle(palletteColors, scale)
  const {userId} = useAuth()
  const { data, isLoading } = useGetProfile(userId)

  if (isLoading) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}> <ActivityIndicator /></View>
  }

  if (!data?.data) {
    return <Text>Not PRofile fount</Text>
  }

  const getGenderLabel = (gender?: string) => {
    if (!gender) return 'Not specified'
    const found = GENDER_SELECTIONS.find(item => item.id === gender || item.label.toLowerCase() === gender.toLowerCase())
    return found ? found.label : gender
  }

  const editProfilePress = () =>{
    {
      data.data && navigation.navigate(appRoutes.editProfile, {profileData: data.data})
    }
  }

  const manageAdressPress = () => {
    navigation.navigate('ManageAdress')
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 70,
      }}>
      <SafeAreaView style={styles.container}>

        {/* HEADER */}

        <View style={styles.headerContainer}>

          <View style={styles.headerLeft}>
            <ImagePicker
              image={data.data.image}
              height={scale.avatarMD_70}
              width={scale.avatarMD_70}
            />
            <View style={styles.headerText}>
              <Text style={typography.subHeading}>Hello, {data.data.fullName}</Text>
              <Text style={typography.subtitle}>Manage your profile and account settings</Text>
            </View>
          </View>

          <IconButton icon={Pencil}
            iconSize={20}
            iconColor={palletteColors.white}
            size={45}
            borderRadius={20} 
            onpress={editProfilePress}
            />

        </View>

        {/* PERSONAL INFO */}

        <Text style={typography.mdTitle}>Personal Information</Text>

        <View style={[typography.shadowCard, { gap: scale.sm_8 }]}>

          <AccountInfoCell
            icon={UserRound}
            title="Full Name"
            value={data.data.fullName}
          />
          <View style={[typography.borderLine, styles.borderColor]} />

          {
            data.data.phone &&
            <View style={{ gap: scale.sm_8 }}>
              <AccountInfoCell
                icon={Phone}
                title="Phone Number"
                value={data.data.phone}
              />
              <View style={[typography.borderLine, styles.borderColor]} />
            </View>
          }

          {
            data.data.email &&
            <View style={{ gap: scale.sm_8 }}>
              <AccountInfoCell
                icon={Mail}
                title="Email Address"
                value={data.data.email}
              />

              <View style={[typography.borderLine, styles.borderColor]} />
            </View>
          }

          <AccountInfoCell
            icon={VenusAndMars}
            title="Gender"
            value={getGenderLabel(data.data.gender)}
          />
          <View style={[typography.borderLine, styles.borderColor]} />

          <AccountInfoCell
            icon={CalendarDays}
            title="Date of Birth"
            value={data.data.dateOfBirth}
          />
        </View>

        {/* Preferences */}
        <Text style={typography.mdTitle}> Preferences </Text>

        <View style={[typography.shadowCard, { gap: scale.sm_8 }]}>
          <AccountInfoCell
            icon={MapPin}
            title="Manage Addresses"
            value='Add,edit or remove addresses'
            onpress={manageAdressPress}
          />
        </View>

        {/* Account */}
        <Text style={typography.mdTitle}>Login & Security</Text>

        <View style={[typography.shadowCard, { gap: scale.sm_8 }]}>
          {
            !data.data.phone &&
            <View style={{ gap: scale.sm_8 }}>
              <AccountInfoCell
                icon={Phone}
                title="Phone Number"
                value="Add phone number"
                onpress={() => console.log('Add phone')}
              />
              <View style={[typography.borderLine, styles.borderColor]} />
            </View>
          }

          {
            !data.data.email &&
            <View style={{ gap: scale.sm_8 }}>
              <AccountInfoCell
                icon={Mail}
                title="Email Address"
                value="Add an email adress"
                onpress={() => console.log('add email')}
              />
              <View style={[typography.borderLine, styles.borderColor]} />
            </View>
          }

          {data.data.email && (
            <View style={{ gap: scale.sm_8 }}>
              <AccountInfoCell
                icon={LockKeyhole}
                title="Change Password"
                value='Change a password'
                onpress={() => console.log('change password')}
              />
              <View style={[typography.borderLine, styles.borderColor]} />
            </View>
          )}

          <AccountInfoCell
            icon={LogOut}
            title="Log Out"
            value='Sign out from your account'
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
      gap: scale.ml_20,
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: scale.ms_12,
    },
    headerLeft: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: scale.ms_12,
    },
    headerText: {
      flex: 1,
      justifyContent: 'center',
    },
    borderColor: {
      backgroundColor: color.appD4D4D4
    }
  })
}