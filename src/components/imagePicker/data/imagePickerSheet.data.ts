import { Camera, Images } from "lucide-react-native";
import { ImagePickerSheetItem } from "../types/imagePicker.types";

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
        id: '2',
        type: 'default',
        image: require('../../../../assets/images/onboarding_1.png')
    }
]