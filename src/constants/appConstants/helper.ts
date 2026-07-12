import { Mars, Venus, VenusAndMars } from "lucide-react-native";
import { SelectionItem } from "../../components/singleSelection/SignleSelectionChips";

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const GENDER_SELECTIONS: SelectionItem[] = [
        {id: '1', label: 'Male', icon: Mars},
        {id: '2', label: 'Female', icon: Venus},
        {id: '3', label: 'Others', icon: VenusAndMars}
    ]