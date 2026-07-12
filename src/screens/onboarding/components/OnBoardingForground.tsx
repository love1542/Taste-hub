import { View, Text } from 'react-native'
import React from 'react'
import { useOnBoardingStyles } from '../onBoarding.styles'
import LeftIconWithTextButton from '../../../components/LeftIconWithTextButton'

type OnBoardingForgroundProps = {
    chipText: string,
    title: string,
    discription: string
    chipColors?: string[]
}
const OnBoardingForground = ({
    chipText,
    title,
    discription,
    chipColors

}:OnBoardingForgroundProps) => {
    const styles = useOnBoardingStyles()
    return (
        <View style={styles.uperRapper}>
            <View style={styles.topView}>
                <LeftIconWithTextButton 
                text={chipText} 
                textStyle={styles.topChipText} 
                style={styles.topChip} 
                colors={chipColors} />
            </View>
            <View style={styles.bottomView}>
                <View style={styles.textContainer}>
                    <Text style={styles.heading}>{title}</Text>
                    <Text style={styles.subtitle}>{discription}</Text>
                </View>
            </View>
        </View>
    )
}

export default OnBoardingForground