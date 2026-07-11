import { LucideIcon } from "lucide-react-native"
import { ImageSourcePropType } from "react-native"

export type ImagePickerSheetItem =
    {   id: 'camera' | 'gallery',
        type: 'action'
        icon: LucideIcon
    } 
    | {
        id: string,
        type: 'default'
        image: ImageSourcePropType
    }
