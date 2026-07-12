import { View, Text, StyleSheet, ImageSourcePropType, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { LayoutScaleType, useTheme } from '../../../constants/theme'
import ImagePicker from '../../../components/imagePicker/ImagePicker'
import BorderLineTextField from '../../../components/fields/BorderLineTextField'
import SingleSelectionChips from '../../../components/singleSelection/SignleSelectionChips'
import { ChevronRight, Container, LocateFixed } from 'lucide-react-native'
import { GENDER_SELECTIONS } from '../../../constants/appConstants'


type SignupProfileType = {
    img?: string | ImageSourcePropType
    onCameraPress: () => void
}
const SignupProfile = ({
    img,
    onCameraPress
}: SignupProfileType) => {
    const { typography, scale } = useTheme()
    const styles = signupProfileSyles(scale)
    const [name, setname] = useState('')
    const onCurrentlocationTap = () => {
        console.log("open curret location")
    }

    return (
        <>
            <View style={styles.titlesWrapper}>
                <Text style={typography.heading}>
                    Complete Your Profile
                </Text>
                <Text style={typography.textField}>Let's finish setting up your account.</Text>
            </View>

            <View style={styles.contentWrapper}>
                <ImagePicker
                    uri={img}
                    onCameraPress={onCameraPress} />

                <BorderLineTextField
                    placeholder='Enter your Name'
                    onChangeText={(name) => setname(name)}
                    title='Full Name'
                    value={name}
                />
                <BorderLineTextField
                    placeholder='DD/MM/YYYY'
                    onChangeText={(name) => setname(name)}
                    title='Date Of Birth'
                    value={name}
                />

                <SingleSelectionChips configs={GENDER_SELECTIONS} defaultSelectedId={GENDER_SELECTIONS[0].id}/>

                <View style={styles.location}>
                    <BorderLineTextField
                        placeholder='Enter Your Location'
                        onChangeText={(name) => setname(name)}
                        title='Location'
                        value={name}
                    />

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
}

export default SignupProfile

const signupProfileSyles = (scale: LayoutScaleType) => {
    return StyleSheet.create({
        titlesWrapper: {
            gap: scale.lg_24
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