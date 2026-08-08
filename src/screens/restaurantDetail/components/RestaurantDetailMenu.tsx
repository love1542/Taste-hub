import { View, Text, StyleSheet, Image } from 'react-native'
import { Plus } from 'lucide-react-native'
import IconButton from '../../../components/IconButton'
import { Food } from '../../../data/types'
import { LayoutScaleType, useTheme } from '../../../constants/theme'

type MenuProps = {
  food: Food | undefined
}

const RestaurantDetailMenu = ({ food }: MenuProps) => {
  const { scale, palletteColors, typography } = useTheme()

  const styles = menuStyles(scale)
  if (!food) {
    return <Text>No food item available</Text>
  }
  return (
    <View style={[styles.foodItem, typography.shadowCard]}>
      <Image source={{ uri: food.image }} style={styles.img} resizeMode='cover' />

      <View style={styles.textContainer}>
        <Text style={styles.foodName}>{food.name}</Text>
        <Text style={[typography.subtitle, { flexShrink: 1 }]}>{food.description}</Text>

        <View style={[{ alignItems: 'baseline' }, styles.foodItem]}>
          <Text style={styles.foodName}>₹{food.discountPrice ? food.discountPrice : food.price}</Text>
          {food.discountPrice &&
            <Text style={[typography.subtitle, styles.discount]}>₹{food.price}</Text>
          }
          <Text style={typography.title}>{food.preparationTime} min</Text>
        </View>

      </View>

      <View style={styles.addButton}>
        <IconButton
          icon={Plus}
          iconSize={20}
          iconColor={palletteColors.white}
          backgroundColor={palletteColors.appPrimary}
          size={30}
          borderRadius={50}
        />
      </View>
    </View>

  )
}

export default RestaurantDetailMenu

export const menuStyles = (scale: LayoutScaleType) => {
  return StyleSheet.create({

    foodItem: {
      flexDirection: 'row',
      gap: scale.ms_12,
      alignItems: 'center'
    },
    foodName: {
      fontSize: scale.md_16,
      fontWeight: '600',
    },
    img: {
      height: 80,
      width: 80,
      borderRadius: 10,
    },
    textContainer: {
      flex: 1,
      gap: scale.xsm_6
    },
    discount: {
      fontSize: scale.md_16,
      textDecorationLine: 'line-through'
    },
    addButton: {
      position: 'absolute',
      bottom: 10,
      right: 10
    }
  })
}