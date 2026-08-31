import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Restaurant } from '../../../data/types'
import { LayoutScaleType, palleteColorsType, useTheme } from '../../../constants/theme'
import IconButton from '../../../components/IconButton'
import { Heart, Star } from 'lucide-react-native'
import AppButton from '../../../components/AppButton'

type RestaurantCellProps = {
    data: Restaurant
    favPress: (id: string) => void
    onCellPress: (id: string) => void
}

const RestaurantCell = ({ data, favPress, onCellPress }: RestaurantCellProps) => {
    const { palletteColors, scale } = useTheme()
    const styles = cellStyles(palletteColors, scale)

    return (
        <TouchableOpacity style={styles.container} onPress={() => onCellPress(data.id)}>
            <Image source={{ uri: data.logo }} style={styles.image} resizeMode="stretch" />
            <View style={styles.overlay}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    
                    <AppButton text={data.isOpen ? 'Open' : 'Closed'} 
                    colors={data.isOpen ? [palletteColors.green, palletteColors.green] : [palletteColors.appPrimary, palletteColors.appPrimary2]} 
                    textStyle={{color: palletteColors.white}}
                    />
                    
                    <IconButton
                        backgroundColor={palletteColors.background}
                        iconColor={palletteColors.black}
                        icon={Heart}
                        iconSize={25}
                        size={40}
                        borderRadius={scale.ms_12}
                        iconFillColor={data.isFavourite ? palletteColors.appPrimary : 'none'}
                        onpress={() => favPress(data.id)}
                    />
                </View>
            </View>
            <View style={styles.infoContainer}>
                <View>
                    <Text style={styles.nameText}>{data.name}</Text>
                    <Text style={styles.metaText}>{data.address}</Text>
                    <Text style={styles.metaText}>Delivery {data.estimatedDeliveryTime} mins</Text>
                </View>

                <View style={styles.rattingWrapper}>
                    <Star fill={palletteColors.yellow}  stroke={'none'} size={20}/>
                    <Text style={styles.ratingText}>{data.rating}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default RestaurantCell

const cellStyles = (color: palleteColorsType, scale: LayoutScaleType) => {
    return StyleSheet.create({
        container: {
            borderWidth: 1,
            borderColor: color.appD4D4D4,
            borderRadius: scale.ms_12,
            marginHorizontal: scale.md_16,
            overflow: 'hidden',
        },
        image: {
            width: '100%',
            height: scale.bannerLG_200,
        },
        overlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            padding: scale.ml_20,
        },
        infoContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: scale.ms_12,
        },
        nameText: {
            color: color.black,
            fontSize: scale.md_16,
            fontWeight: 'bold',
        },
        metaText: {
            color: color.app737373,
            marginTop: scale.nano_2,
        },
        rattingWrapper: {
            backgroundColor: color.appPrimary,
            paddingVertical: scale.xs_4,
            paddingHorizontal: scale.sm_8,
            borderRadius: 30,
            flexDirection: 'row',
            alignItems: 'center',
            gap: scale.xs_4
        },
        ratingText: {
            color: color.white,
            fontSize: scale.md_16,
            fontWeight: '600'
        },
    }
    )
}