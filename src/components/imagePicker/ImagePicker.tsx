import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useMemo } from 'react'
import { LayoutScaleType, ThemeColors, useTheme } from '../../constants/theme'
import { Camera } from 'lucide-react-native'
import { CAMERA_DEFAULT_IMAGES } from '../../constants/appConstants'

type ImagePickerProps = {
    uri?: string,
    onCameraPress: () => void
}

const ImagePicker = ({
    uri,
    onCameraPress
}: ImagePickerProps) => {
    const { scale, color, palletteColors } = useTheme()
    const styles = ImagePickerStyles(scale, color)

    const randomImage = useMemo(() => {
        return CAMERA_DEFAULT_IMAGES[
            Math.floor(Math.random() * CAMERA_DEFAULT_IMAGES.length)
        ];
    }, []);

    return (
        <View style={[styles.conatiner]}>
            <Image source={uri ? {uri} : randomImage.image} style={[styles.image]} />
            <TouchableOpacity style={styles.cameraWrapper} onPress={onCameraPress}>
                <Camera size={20} color={palletteColors.appPrimary} />
            </TouchableOpacity>
        </View>
    )
}

export default ImagePicker

const ImagePickerStyles = (scale: LayoutScaleType, theme: ThemeColors) => {
    return StyleSheet.create({
        conatiner: {
            height: scale.bannerSM_100,
            width: scale.bannerSM_100,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.textPrimary
        },
        image: {
            height: scale.avatarLG_96,
            width: scale.avatarLG_96,
            borderRadius: 50,

        },
        cameraWrapper: {
            height: scale.avatarSM_40,
            width: scale.avatarSM_40,
            borderRadius: 50,
            position: 'absolute',
            bottom: -2,
            right: -2,
            backgroundColor: theme.background,
            justifyContent: 'center',
            alignItems: 'center'
        }
    })
}