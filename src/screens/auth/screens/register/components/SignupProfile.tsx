import { View, Text, StyleSheet} from 'react-native'
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { LayoutScaleType, useTheme } from '../../../../../constants/theme'
import ImagePicker from '../../../../../components/imagePicker/ImagePicker'
import BorderLineTextField from '../../../../../components/fields/BorderLineTextField'
import SingleSelectionChips from '../../../../../components/singleSelection/SignleSelectionChips'
import { ChevronDown} from 'lucide-react-native'
import { GENDER_SELECTIONS } from '../../../../../constants/appConstants'
import { profileStepForm, StepHandle } from '../../../types/auth.types'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { profileStepSchema } from '../../../../../utilites/validation/authSchema'
import { useAppBottomSheet } from '../../../../../components/bottomSheet/hooks/useAppBottomSheet'
import AppDateTimePicker from '../../../../../components/datePicker/AppDateTimePicker'
import { PickedImage } from '../../../../../components/imagePicker/types/imagePicker.types'


type SignupProfileProps = {
    img:  PickedImage | undefined
    onCameraPress: () => void
}
const SignupProfile = forwardRef<StepHandle<profileStepForm>, SignupProfileProps>(({ img, onCameraPress }, ref) => {
    const { typography, scale } = useTheme()
    const styles = signupProfileSyles(scale)
    const { open } = useAppBottomSheet()

    const { control, handleSubmit, formState, clearErrors, setValue } = useForm<profileStepForm>({
        resolver: zodResolver(profileStepSchema),
        defaultValues: {
            image: img,
            dateOfBirth: "",
            fullName: '',
            gender: '',
        },
    })

    const openDatePicker = () => {
        open({
            title: "Date of Birth",
            content: (<AppDateTimePicker mode='date'
            onChange={(dateString)=> setValue("dateOfBirth", dateString, {
            shouldValidate: true
          })}
            />),
        })
    }

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
                    image={img}
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
                            rightIcon = {<ChevronDown />}
                            value={value}
                            disabled
                            errorMessage={formState.errors.dateOfBirth?.message}
                            onFocus={() => {
                                clearErrors('dateOfBirth')
                            }}
                            onPress={openDatePicker}
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
    })
}