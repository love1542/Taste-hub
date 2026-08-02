import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { Restaurant } from '../../../data/types'
import { LayoutScaleType, palleteColorsType, useTheme } from '../../../constants/theme'
import IconButton from '../../../components/IconButton'
import { Heart } from 'lucide-react-native'

type RestaurantCellProps = {
    data: Restaurant
}

const RestaurantCell = ({ data }: RestaurantCellProps) => {
    const { palletteColors, scale } = useTheme()
    const styles = cellStyles(palletteColors, scale)

    return (
        <View style={styles.container}>
            <Image source={{ uri: data.logo }} style={styles.image} resizeMode="stretch" />
            <View style={styles.overlay}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    
                    <Text style={styles.nameText}>{data.isOpen ? 'Open' : 'Closed'}</Text>

                    <IconButton backgroundColor={palletteColors.dullwhite} iconColor={palletteColors.black} icon={Heart} iconSize={25}  size={40}
                     borderRadius={scale.ms_12}
                    iconFillColor= {data.isFavourite ? palletteColors.appPrimary : 'none'}
                     onpress={() => {}}
                     />
                </View>
            </View>
            <View style={styles.infoContainer}>
                <View>
                    <Text style={styles.nameText}>{data.name}</Text>
                    <Text style={styles.metaText}>{data.address}</Text>
                    <Text style={styles.metaText}>{data.estimatedDeliveryTime} mins</Text>
                </View>
                <Text style={styles.ratingText}>{data.rating} stars</Text>
            </View>
        </View>
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
            height: 250,
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
        ratingText: {
            color: color.black,
            fontSize: scale.md_16,
        },
    }
    )
}