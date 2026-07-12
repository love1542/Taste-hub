import { TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native'
import React from 'react'
import { IMAGE_PICKER_SHEET_BTNS } from './data/imagePickerSheet.data'
import { LayoutScale, LayoutScaleType, useTheme } from '../../constants/theme'
import { ImagePickerSheetItem } from './types/imagePicker.types'

type ImagePickerSheetProps = {
    onCameraPress: () => void
    onGalleryPress: () => void
    defaultIconPress: (item: ImagePickerSheetItem) => void
}

const ImagePickerSheet = ({
    onCameraPress,
    onGalleryPress,
    defaultIconPress
}: ImagePickerSheetProps) => {

    const { scale } = useTheme()
    const styles = imagePickerSheetStyles(scale ?? LayoutScale)

    const onIconPress = (item: ImagePickerSheetItem) => {
        if (item.id === 'camera') {
            onCameraPress()
        } else if (item.id === 'gallery') {
            onGalleryPress()
        } else if (item.type === 'default') {
            defaultIconPress(item)
        } else {
            defaultIconPress(item)
        }
    }

    return (
        <FlatList
            data={IMAGE_PICKER_SHEET_BTNS}
            numColumns={4}
            renderItem={({ item, index }) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => onIconPress(item)}
                    style={styles.button}>
                    {item.type === 'action' && <item.icon size={40} />}
                    {item.type === 'default' && <Image source={item.image}
                        style={styles.image} />}
                </TouchableOpacity>

            )} />
    )
}

export default ImagePickerSheet

const imagePickerSheetStyles = (scale: LayoutScaleType) => {
    return StyleSheet.create({
        button: {
            height: scale.avtarBorder_60,
            width: scale.avtarBorder_60,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50,
            borderWidth: 2,
            borderColor: 'black',
            margin: scale.sm_8
        },
        image: {
            width: scale.avatarMD_56,
            height: scale.avatarMD_56,
            borderRadius: 50
        }
    })
}