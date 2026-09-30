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
import AppButton from '../../components/AppButton'
import { useGetAddress } from '../adresses/hooks/useQueries'

type NavigationType = NativeStackNavigationProp<AppStackParamList, 'EditProfile'>

const Profile = () => {
  const { logout } = useAuth()
  const navigation = useNavigation<NavigationType>()
  const { palletteColors, scale, typography } = useTheme()
  const styles = profileStyle(palletteColors, scale)
  const { data, isLoading } = useGetProfile("")
  const { data: addressResponse } = useGetAddress()
  const defaultAddress = addressResponse?.data?.find(address => address.isDefault)

  if (isLoading) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}> <ActivityIndicator /></View>
  }

  if (!data?.data) {
    return (
      <View style={styles.emptyStateContainer}>
        <Text style={typography.title}>Profile not found</Text>
        <AppButton
          text="Logout"
          onPress={logout}
          style={styles.logoutButton}
        />
      </View>
    )
  }

  const getGenderLabel = (gender?: string) => {
    if (!gender) return 'Not specified'
    const found = GENDER_SELECTIONS.find(item => item.id === gender || item.label.toLowerCase() === gender.toLowerCase())
    return found ? found.label : gender
  }

  const editProfilePress = () => {
    {
      data.data && navigation.navigate(appRoutes.editProfile, {
        profileData: {
          id: data.data.userId,
          email: data.data.email ?? undefined,
          phone: data.data.phone ?? undefined,
          image: data.data.imageUrl ? { type: 'uri', uri: data.data.imageUrl } : undefined,
          fullName: data.data.fullName,
          dateOfBirth: data.data.dateOfBirth ?? '',
          gender: data.data.gender ?? '',
        },
      })
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
              image={data.data.imageUrl ? { type: 'uri', uri: data.data.imageUrl } : undefined}
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
            value={defaultAddress
              ? `${defaultAddress.addressLine}, ${defaultAddress.city}`
              : 'Add, edit or remove addresses'}
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
      backgroundColor: color.background,
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
    },
    emptyStateContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: scale.md_16,
      gap: scale.sm_8,
    },
    logoutButton: {
      width: '100%',
      marginTop: scale.sm_8,
    }
  })
}