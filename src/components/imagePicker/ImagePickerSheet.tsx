import { TouchableOpacity, Image, StyleSheet, View } from 'react-native'
import React from 'react'
import { LayoutScale, LayoutScaleType, useTheme } from '../../constants/theme'
import { useGetDefaultImages } from '../../hooks'
import { Camera, Images } from 'lucide-react-native'

type ImagePickerSheetProps = {
    onCameraPress: () => void
    onGalleryPress: () => void
    defaultIconPress: (id: string) => void
}

const ImagePickerSheet = ({
    onCameraPress,
    onGalleryPress,
    defaultIconPress
}: ImagePickerSheetProps) => {

    const { scale } = useTheme()
    const styles = imagePickerSheetStyles(scale ?? LayoutScale)

    const { data: defaultImages } = useGetDefaultImages()

    const defaultItems = defaultImages?.data ?? []

    return (
        <View style={styles.container}>
            <View style={styles.actionsRow}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={onCameraPress}
                >
                    <Camera size={40} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={onGalleryPress}
                >
                    <Images size={40} />
                </TouchableOpacity>

                {defaultItems.map((item, index) => (
                    <TouchableOpacity
                        key={item.id ?? index}
                        onPress={() => defaultIconPress(item.id)}
                        style={styles.button}>
                        <Image source={{ uri: item.imageUrl }}
                            style={styles.image} />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    )
}

export default ImagePickerSheet

const imagePickerSheetStyles = (scale: LayoutScaleType) => {
    return StyleSheet.create({
        container: {
            width: '100%',
        },
        actionsRow: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: scale.ms_12,
        },
        button: {
            height: scale.avtarBorder_60,
            width: scale.avtarBorder_60,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50,
            borderWidth: 2,
            borderColor: 'black',
        },
        image: {
            width: scale.controlLG_56,
            height: scale.controlLG_56,
            borderRadius: 50
        }
    })
}