import { View, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import ImagePicker from '../../components/imagePicker/ImagePicker'
import { useAppBottomSheet } from '../../components/bottomSheet/hooks/useAppBottomSheet'
import { LayoutScaleType, palleteColorsType, useTheme } from '../../constants/theme'
import { ChevronDown } from 'lucide-react-native'
import { Controller, useForm } from 'react-hook-form'
import BorderLineTextField from '../../components/fields/BorderLineTextField'
import SingleSelectionChips from '../../components/singleSelection/SignleSelectionChips'
import { appRoutes, GENDER_SELECTIONS } from '../../constants/appConstants'
import { profileStepForm } from '../auth/types/auth.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { profileStepSchema } from '../../utilites/validation/authSchema'
import AppDateTimePicker from '../../components/datePicker/AppDateTimePicker'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { AppStackParamList } from '../../navigation/type'
import LeftIconWithTextButton from '../../components/LeftIconWithTextButton'
import AppHeader from '../../components/AppHeader'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useEditProfile } from './hooks/useMutation'
import ImagePickerSheet from '../../components/imagePicker/ImagePickerSheet'
import { ImagePickerSheetItem, PickedImage } from '../../components/imagePicker/types/imagePicker.types'
import { ImagePickerType, useImagePicker } from '../../components/imagePicker/useImagePicker'


type EditProfileRouteProps = RouteProp<AppStackParamList, typeof appRoutes.editProfile>

type NavigationType = NativeStackNavigationProp<AppStackParamList, typeof appRoutes.editProfile>

const EditProfile = () => {
    const route = useRoute<EditProfileRouteProps>()
    const profileData = route.params.profileData
    const navigation = useNavigation<NavigationType>()
    const { open, close } = useAppBottomSheet()
    const { scale, palletteColors } = useTheme()
    const styles = editprofileStyle(scale, palletteColors)
    const [image, setImage] = useState<PickedImage | undefined>(profileData.image)

    const { control, clearErrors, formState, getValues, setValue, handleSubmit } = useForm<profileStepForm>({
        resolver: zodResolver(profileStepSchema),
        defaultValues: {
            dateOfBirth: profileData.dateOfBirth,
            fullName: profileData?.fullName ?? '',
            gender: profileData?.gender ?? '',
            image: image
        }
    })

    const { isPending, mutateAsync } = useEditProfile(profileData.id)


    const savePress = handleSubmit(async (editData) => {
        const userProfile = { ...profileData, ...editData, image };
        try {
            const res = await mutateAsync(userProfile);
            console.log("res", res)
            if (res?.success) {
                navigation.goBack()
            }
        } catch (error) {
            console.log(error)
        }
    });

    const handleDefaultImagePress = (item: ImagePickerSheetItem) => {
        if (item.type === 'default') {
            setImage({ type: 'default', id: item.id })
        }
        close()
    }
    const { pickImage } = useImagePicker()

    const oncamerapress = () => {
        open({
            title: 'Select Image',
            content: <ImagePickerSheet
                onCameraPress={async () => {
                    let image = await pickImage(ImagePickerType.Camera)
                    setImage({ type: 'uri', uri: image?.path })
                    close()
                }}
                onGalleryPress={async () => {
                    let image = await pickImage(ImagePickerType.Gallery)
                    setImage({ type: 'uri', uri: image?.path })
                    close()
                }}
                defaultIconPress={handleDefaultImagePress}
            />
        })
    }

    const openDatePicker = () => {
        open({
            title: "Date of Birth",
            content: (<AppDateTimePicker mode='date'
                onChange={(dateString) => setValue("dateOfBirth", dateString, {
                    shouldValidate: true
                })}
            />),
        })
    }

    return (
        // <SafeAreaView style={styles.safeArea}>
        <View style={styles.safeArea}>
            {/* Fixed Header */}

            <AppHeader
                title="Edit Profile"
                onBackPress={() => { navigation.goBack() }}
            />

            {/* Editing Area */}
            <View style={{ flex: 1 }}>
                <View style={styles.contentWrapper}>
                    <ImagePicker
                        image={image}
                        onCameraPress={oncamerapress}
                    />

                    <Controller
                        control={control}
                        name="fullName"
                        render={({ field: { onChange, value } }) => (
                            <BorderLineTextField
                                placeholder="Enter your Name"
                                onChangeText={onChange}
                                title="Full Name"
                                value={value}
                                errorMessage={formState.errors.fullName?.message}
                                onFocus={() => {
                                    clearErrors('fullName')
                                }}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="dateOfBirth"
                        render={({ field: { value } }) => (
                            <BorderLineTextField
                                placeholder="DD/MM/YYYY"
                                title="Date Of Birth"
                                rightIcon={<ChevronDown />}
                                value={value}
                                disabled
                                errorMessage={formState.errors.dateOfBirth?.message}
                                onFocus={() => {
                                    clearErrors('dateOfBirth')
                                }}
                                onPress={openDatePicker}
                                onChangeText={() => { }}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="gender"
                        render={({ field: { onChange, value } }) => (
                            <SingleSelectionChips
                                title="Gender"
                                configs={GENDER_SELECTIONS}
                                selectedValue={value}
                                onSelectionChange={onChange}
                                errorMessage={formState.errors.gender?.message}
                                scrolling={false}
                            />
                        )}
                    />
                </View>

                {/* Fixed Bottom Save Button */}
                <View style={styles.saveWrapper}>
                    <LeftIconWithTextButton
                        text={isPending ? 'Loading...' : 'Save'}
                        onPress={savePress}
                        colors={[
                            palletteColors.appPrimary,
                            palletteColors.appPrimary2,
                        ]}
                        textStyle={{
                            color: palletteColors.white,
                        }}
                    />
                </View>
            </View>
            {/* </SafeAreaView> */}
        </View>
    )
}

export default EditProfile

const editprofileStyle = (
    scale: LayoutScaleType,
    color: palleteColorsType
) => {
    return StyleSheet.create({
        safeArea: {
            flex: 1,
        },
        contentWrapper: {
            backgroundColor: color.background,
            flex: 1,
            alignItems: 'center',
            gap: scale.xl_18,
            paddingTop: scale.xl_18,
            paddingHorizontal: scale.md_16,
        },

        saveWrapper: {
            paddingHorizontal: scale.md_16,
            paddingBottom: scale.md_16,
        },
    })
}