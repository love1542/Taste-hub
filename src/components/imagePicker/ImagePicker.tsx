import { View, Image, StyleSheet, TouchableOpacity, ImageSourcePropType, DimensionValue } from 'react-native'
import React, { useMemo } from 'react'
import { LayoutScaleType, ThemeColors, useTheme } from '../../constants/theme'
import { Camera } from 'lucide-react-native'
import { getPickedImage, IMAGE_PICKER_SHEET_BTNS } from './data/imagePickerSheet.data'
import { PickedImage } from './types/imagePicker.types'

type ImagePickerProps = {
    image?: PickedImage | undefined,
    onCameraPress?: () => void
    height?: DimensionValue;
    width?: DimensionValue;
}

const ImagePicker = ({
    image,
    onCameraPress,
    height = 100,
    width = 100
}: ImagePickerProps) => {
    const { scale, color, palletteColors } = useTheme()
    const styles = ImagePickerStyles(scale, color)

    const img = getPickedImage(image)
   

    return (
        <View style={[styles.conatiner, {height: height, width: width}]}>
            <Image source={img} style={[styles.image,{height: height, width: width}]} />
            {onCameraPress &&
                <TouchableOpacity style={styles.cameraWrapper} onPress={onCameraPress}>
                    <Camera size={20} color={palletteColors.appPrimary} />
                </TouchableOpacity>
            }

        </View>
    )
}

export default ImagePicker

const ImagePickerStyles = (scale: LayoutScaleType, theme: ThemeColors) => {
    return StyleSheet.create({
        conatiner: {
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.textPrimary
        },
        image: {
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