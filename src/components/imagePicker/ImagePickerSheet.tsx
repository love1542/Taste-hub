import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native'
import React from 'react'
import { IMAGE_PICKER_SHEET_BTNS } from './data/imagePickerSheet.data'
import { height, LayoutScaleType, useTheme } from '../../constants/theme'
import { ImagePickerSheetItem } from './types/imagePicker.types'

type ImagePickerSheetProps = {
    onCameraPress: () => void
    onGalleryPress: () => void
}

const ImagePickerSheet = ({
    onCameraPress,
    onGalleryPress
}: ImagePickerSheetProps) => {

    const {scale} = useTheme()
    const styles = imagePickerSheetStyles(scale)

    const onIconPress = (item: ImagePickerSheetItem) => {
        if (item.id === 'camera') {
            onCameraPress()
        } else if (item.id === 'gallery') {
            onGalleryPress()
        } else {
            console.log('default click')
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
        button:{
            height: 70,
            width:70,
            justifyContent:'center',
            alignItems: 'center',
            borderRadius: 50,
            borderWidth: 2,
            borderBlockColor: 'black',
        },
        image:{
            width: 68,
            height: 68,
            borderRadius: 50
        }
    })
}