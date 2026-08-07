import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native'
import React from 'react'
import { LayoutScaleType, useTheme } from '../../../constants/theme'
import { Restaurant } from '../../../data/types'
import IconButton from '../../../components/IconButton'
import { ArrowLeft, Dot, Heart } from 'lucide-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type HeroSectionType = {
    restaturant: Restaurant
    onbackPress: () => void
    onHeartTap: () => void
}

const HeroSection = ({ restaturant, onbackPress, onHeartTap }: HeroSectionType) => {
    const { scale, palletteColors, typography } = useTheme()
    const styles = heroStyles(scale)

    const isOpenColor = restaturant.isOpen ? palletteColors.green : palletteColors.red
    return (
        <View style={styles.continer}>

            <ImageBackground source={{ uri: restaturant.coverImage }}
                style={styles.img}
                resizeMode='cover'>

                <View style={styles.overlay} />

                <SafeAreaView style={styles.buttonsContainer}>
                    <IconButton
                        icon={ArrowLeft}
                        iconSize={20}
                        backgroundColor='white'
                        borderRadius={50}
                        iconColor='black'
                        size={35}
                        onpress={onbackPress}
                    />

                    <IconButton
                        icon={Heart}
                        iconSize={20}
                        backgroundColor='white'
                        borderRadius={50}
                        iconColor={restaturant.isFavourite ? 'none' : palletteColors.black}
                        iconFillColor={restaturant.isFavourite ? palletteColors.yellow : 'none'}
                        size={35}
                        onpress={onHeartTap}
                    />
                </SafeAreaView>

                <View style={styles.nameSection}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Dot color={isOpenColor} size={30} />
                        <Text style={[typography.title, { color: isOpenColor }]}>
                            {restaturant.isOpen ? 'isOpen' : 'isClosed'}
                        </Text>
                    </View>
                    <Text style={[typography.subHeading, { color: palletteColors.white }]}>{restaturant.name}</Text>
                </View>
            </ImageBackground>

        </View>
    )
}

export default HeroSection

const heroStyles = (scale: LayoutScaleType) => {
    return StyleSheet.create({
        continer: {
            height: 320,
            width: '100%'
        },
        img: {
            flex: 1
        },
        overlay: {
            ...StyleSheet.absoluteFill,
            backgroundColor: "rgba(0,0,0,0.25)", // 25% black
        },
        buttonsContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: scale.md_16
        },
        nameSection: {
            position: 'absolute',
            bottom: 40,
            left: 10,
            gap: scale.sm_8
        }
    })
}