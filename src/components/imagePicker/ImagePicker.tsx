import { View, Image, StyleSheet, TouchableOpacity, ImageSourcePropType } from 'react-native'
import React, { useMemo } from 'react'
import { LayoutScaleType, ThemeColors, useTheme } from '../../constants/theme'
import { Camera } from 'lucide-react-native'
import { IMAGE_PICKER_SHEET_BTNS } from './data/imagePickerSheet.data'

type ImagePickerProps = {
    uri?: string | ImageSourcePropType,
    onCameraPress: () => void
}

const ImagePicker = ({
    uri,
    onCameraPress
}: ImagePickerProps) => {
    const { scale, color, palletteColors } = useTheme()
    const styles = ImagePickerStyles(scale, color)

    const randomImage = useMemo(() => {
        let defaultImages = IMAGE_PICKER_SHEET_BTNS.filter((item)=> item.type === 'default')
        return defaultImages[
            Math.floor(Math.random() * defaultImages.length)
        ];
    }, []);

    const imageSource =
        typeof uri === 'string'
            ? uri.trim()
                ? { uri }
                : randomImage.image
            : uri ?? randomImage.image;

    return (
        <View style={[styles.conatiner]}>
            <Image source={imageSource} style={[styles.image]} />
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