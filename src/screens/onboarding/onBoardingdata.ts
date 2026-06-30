import { ImageSourcePropType } from "react-native"

type OnBoardingDataType = {
    id: string,
    chipText: string,
    title: string,
    description: string,
    bgImage: ImageSourcePropType
    colors?: string[]
}

export const onBoardingData: OnBoardingDataType[] = [
    {
        id: '1',
        chipText: '✨ Personalised',
        title: 'Food that reads your vibe',
        description: 'From late-night comfort classics to weekend brunch — Cravely learns what you love and delivers it.',
        bgImage: require('../../../assets/images/onboarding_1.png'),
        colors: ['#FF6B35', '#FF4757'] 
    },
    {
        id: '2',
        chipText: '🍔 Fast & Fresh',
        title: 'Delivered Fast & Fresh',
        description: 'Get your favorite meals delivered quickly and at the perfect temperature, every time.',
        bgImage: require('../../../assets/images/onboarding_2.png'),
        colors: ['#5B5BFF', '#8B5CF6']
    },
    {
        id: '3',
        chipText: '💰 Affordable',
        title: 'Affordable Delights',
        description: 'Enjoy delicious meals without breaking the bank. Cravely brings you great food at prices that fit your budget.',
        bgImage: require('../../../assets/images/onboarding_3.png'),
        colors: ['#1A1612', '#2C2420']
    }
] as const
