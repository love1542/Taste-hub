import { Camera, Images } from "lucide-react-native";
import { ImagePickerSheetItem, PickedImage } from "../types/imagePicker.types";
import { ImageSourcePropType } from "react-native";

export const IMAGE_PICKER_SHEET_BTNS: ImagePickerSheetItem[] = [
    {
        id: 'camera',
        icon: Camera,
        type: 'action'
    },
    {
        id: 'gallery',
        icon: Images,
        type: 'action'
    },
    {
        id: 'avtar_1',
        type: 'default',
        image: require('../../../../assets/images/onboarding_1.png')
    }
]

export const getPickedImage = (
    image: PickedImage | undefined):ImageSourcePropType | undefined => {
    if (image == undefined) return undefined

    if (image.type === 'uri') {
        return { uri: image.uri }
    }

    const matched = IMAGE_PICKER_SHEET_BTNS.find((value) => value.type === 'default' && value.id === image.id)
    return matched?.type === 'default' ? matched.image : undefined
}