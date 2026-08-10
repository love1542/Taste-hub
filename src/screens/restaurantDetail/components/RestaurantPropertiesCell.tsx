import { View, Image, StyleSheet } from 'react-native'
import React from 'react'
import { Restaurant } from '../../../data/types'
import { Clock3, MapPin, PaperBagIcon, Star } from 'lucide-react-native'
import { LayoutScaleType, useTheme, width } from '../../../constants/theme'
import InfoItem from '../../../components/infoItem/infoItem'

type props = {
  restaturant: Restaurant
}

const RestaurantPropertiesCell = ({ restaturant }: props) => {
  const { palletteColors, scale, typography } = useTheme()
  const styles = viewStyle(scale)

  return (
    <View style={[styles.container, typography.shadowCard]}>
      <Image source={{ uri: restaturant.logo }} style={styles.img} resizeMode='cover' />
      <View style={{ gap: scale.xs_4 }}>

        <InfoItem
          icon={<Star fill={palletteColors.yellow} size={20} color={'none'} />}
          text={`${restaturant.rating} (Rating)`}
          textSize={scale.md_16}
          textWeight='600'
        />

        <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
          <InfoItem
            icon={<Clock3 size={15} color={palletteColors.appPrimary} />}
            text={`${restaturant.estimatedDeliveryTime} min`}
          />

          <InfoItem
            icon={<MapPin size={15} color={palletteColors.appPrimary} />}
            // text={`${restaturant.location}`}
            text='1.5 km'
          />
          
        </View>

        <InfoItem
          icon={<PaperBagIcon size={15} color={palletteColors.appPrimary} />}
          text={`₹${restaturant.deliveryFee} dilivery`}
        />
      </View>
    </View>
  )
}

export default RestaurantPropertiesCell

const viewStyle = (scale: LayoutScaleType) => {
  return StyleSheet.create({
    container: {
      width: '90%',
      alignSelf: 'center',
      backgroundColor: 'white',
      flexDirection: 'row',
      gap: 20,
    },
    img: {
      height: scale.avatarMD_56,
      width: scale.avatarMD_56,
      borderRadius: 10,
    }
  })
}