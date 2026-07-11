import { DefaultImageType } from "../../components/imagePicker/imagePicker.types";

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const CAMERA_DEFAULT_IMAGES: DefaultImageType[] = [
    {
        id: "1",
        image: require('../../../assets/images/onboarding_1.png')
    },
    {
        id: "2",
        image: require('../../../assets/images/onboarding_2.png')
    },
    {
        id: "3",
        image: require('../../../assets/images/onboarding_3.png')
    }
]