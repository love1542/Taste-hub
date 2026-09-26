import { Mars, Venus, VenusAndMars } from "lucide-react-native";
import { SelectionItem } from "../../components/singleSelection/SignleSelectionChips";

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const GENDER_SELECTIONS: SelectionItem[] = [
    {id: 'male', label: 'Male', icon: Mars},
    {id: 'female', label: 'Female', icon: Venus},
    {id: 'other', label: 'Other', icon: VenusAndMars}
    ]

export const RESEND_TIME = 30;

export const ADDRESS_LABEL = {
    HOME: 'home',
    WORK: 'work',
    OTHER: 'other',
} as const

export type AddressLabel =
    (typeof ADDRESS_LABEL)[keyof typeof ADDRESS_LABEL]
    
export const ADDRESS_LABELS = [
    {
        id: ADDRESS_LABEL.HOME,
        label: 'Home',
    },
    {
        id: ADDRESS_LABEL.WORK,
        label: 'Work',
    },
    {
        id: ADDRESS_LABEL.OTHER,
        label: 'Other',
    },
] as const

