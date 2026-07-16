import { View, Text, StyleSheet, ImageSourcePropType, TouchableOpacity } from 'react-native'
import React, { forwardRef, useImperativeHandle } from 'react'
import { LayoutScaleType, useTheme } from '../../../constants/theme'
import ImagePicker from '../../../components/imagePicker/ImagePicker'
import BorderLineTextField from '../../../components/fields/BorderLineTextField'
import SingleSelectionChips from '../../../components/singleSelection/SignleSelectionChips'
import { ChevronRight, LocateFixed } from 'lucide-react-native'
import { GENDER_SELECTIONS } from '../../../constants/appConstants'
import { profileStepForm, StepHandle } from '../types/auth.types'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { profileStepSchema } from '../../../utilites/validation/authSchema'


type SignupProfileProps = {
    img: string | ImageSourcePropType | undefined
    onCameraPress: () => void
}
const SignupProfile = forwardRef<StepHandle<profileStepForm>, SignupProfileProps>(({ img, onCameraPress }, ref) => {
    const { typography, scale } = useTheme()
    const styles = signupProfileSyles(scale)
    const onCurrentlocationTap = () => {
        console.log("open curret location")
    }

    const { control, handleSubmit, formState, clearErrors } = useForm<profileStepForm>({
        resolver: zodResolver(profileStepSchema),
        defaultValues: {
            image: img ?? undefined,
            dateOfBirth: "",
            fullName: '',
            gender: '',
            location: ''
        },
    })

    useImperativeHandle(ref, () => ({
        validate: async () => {
            return await new Promise<profileStepForm | null>((resolve) => {
                handleSubmit(
                    (data) => resolve(data),
                    () => resolve(null)
                )()
            })
        }
    }))

    return (
        <>
            <View style={styles.titlesWrapper}>
                <Text style={typography.subHeading}>
                    Complete Your Profile
                </Text>
                <Text style={typography.subtitle}>Let's finish setting up your account.</Text>
            </View>

            <View style={styles.contentWrapper}>
                <ImagePicker
                    uri={img}
                    onCameraPress={onCameraPress} />

                <Controller
                    control={control}
                    name='fullName'
                    render={({ field: { onChange, value } }) => (
                        <BorderLineTextField
                            placeholder='Enter your Name'
                            onChangeText={onChange}
                            title='Full Name'
                            value={value}
                            errorMessage={formState.errors.fullName?.message}
                            onFocus={() => {
                                clearErrors('fullName')
                            }}
                        />
                    )} />

                <Controller
                    control={control}
                    name='dateOfBirth'
                    render={({ field: { onChange, value } }) => (
                        <BorderLineTextField
                            placeholder='DD/MM/YYYY'
                            onChangeText={onChange}
                            title='Date Of Birth'
                            value={value}
                            errorMessage={formState.errors.dateOfBirth?.message}
                            onFocus={() => {
                                clearErrors('dateOfBirth')
                            }}
                        />
                    )} />




                <Controller
                    control={control}
                    name='gender'
                    render={({ field: { onChange, value } }) => (
                        <SingleSelectionChips
                            title='Gender'
                            configs={GENDER_SELECTIONS}
                            selectedValue={value}
                            onSelectionChange={onChange}
                            errorMessage={formState.errors.gender?.message}

                        />
                    )} />

                <View style={styles.location}>
                    <Controller
                        control={control}
                        name='location'
                        render={({ field: { onChange, value } }) => (
                            <BorderLineTextField
                                placeholder='Enter Your Location'
                                onChangeText={onChange}
                                title='Location'
                                value={value}
                                errorMessage={formState.errors.location?.message}
                                onFocus={() => {
                                    clearErrors('location')
                                }}
                            />
                        )} />

                    <TouchableOpacity
                        style={styles.currentLocationWrapper}
                        onPress={onCurrentlocationTap}
                    >
                        <View style={styles.currentLocation}>
                            <LocateFixed />
                            <Text>Use Current Location</Text>
                            <ChevronRight />
                        </View>
                        <View style={typography.borderLine} />
                    </TouchableOpacity>
                </View>

            </View>
        </>
    )
})

export default SignupProfile

const signupProfileSyles = (scale: LayoutScaleType) => {
    return StyleSheet.create({
        titlesWrapper: {
            gap: scale.iconSM_16
        },
        contentWrapper: {
            width: '100%',
            alignItems: 'center',
            gap: scale.xl_18,
            paddingTop: scale.xl_18
        },
        location: {
            width: '100%',
            gap: scale.ms_12
        },
        currentLocationWrapper: {
            gap: scale.ms_12
        },
        currentLocation: {
            flexDirection: 'row',
            alignItems: 'center'
        }
    })
}