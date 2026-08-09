import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Clock, Minus, Plus } from 'lucide-react-native'
import IconButton from '../../../components/IconButton'
import { Food } from '../../../data/types'
import { LayoutScaleType, palleteColorsType, useTheme } from '../../../constants/theme'
import { useCart } from '../../../hooks'

type MenuProps = {
  food: Food | undefined
}

const RestaurantDetailMenu = ({ food }: MenuProps) => {
  const { scale, palletteColors, typography } = useTheme()

  const { addToCart, items, updateQuantity } = useCart()

   if (!food) {
    return <Text>No food item available</Text>
  }

  const plusClick =() => {
    addToCart({
      foodId: food.id,
      image: food.image,
      name: food.name,
      preparationTime: food.preparationTime,
      price: food.price,
      discountPrice: food.discountPrice,
      quantity: 1,
      restaurantId: food.restaurantId
    })
  }

  const cartItem = items.find(item => item.foodId === food.id);

  const quantity = cartItem?.quantity ?? 0;

  const styles = menuStyles(scale, palletteColors)
 

  return (
    <View style={[styles.foodItem, typography.shadowCard]}>
      <Image source={{ uri: food.image }} style={styles.img} resizeMode='cover' />

      <View style={styles.textContainer}>
        <Text style={styles.foodName}>{food.name}</Text>
        <Text style={[typography.subtitle, { flexShrink: 1 }]}>{food.description}</Text>

        <View style={[{ alignItems: 'baseline' }, styles.foodItem]}>
          <Text style={styles.foodName}>₹{food.discountPrice ? food.discountPrice : food.price}</Text>
          {
            food.discountPrice &&
            <Text style={[typography.subtitle, styles.discount]}>₹{food.price}</Text>
          }

          <View style={{ width: 1, height: 10, backgroundColor: palletteColors.appD4D4D4 }} />
          <View style={[typography.rowCenter, { gap: scale.xs_4 }]}>
            <Clock size={15} color={palletteColors.appPrimary} />
            <Text>{food.preparationTime} min</Text>
          </View>

        </View>

      </View>

      <View style={styles.addButton}>
        {quantity === 0 ? (
          <IconButton
            icon={Plus}
            iconSize={20}
            iconColor={palletteColors.white}
            backgroundColor={palletteColors.appPrimary}
            size={35}
            borderRadius={50}
            onpress={plusClick}
          />
        ) : (
          <View style={styles.quantityContainer}>
            <IconButton
            icon={Minus}
            iconSize={16}
            iconColor={palletteColors.appPrimary}
            backgroundColor={palletteColors.white}
            size={27}
            borderRadius={50}
            onpress={
              () => updateQuantity(food.id, quantity - 1)
            }
          />

            <Text style={[typography.title, {color: palletteColors.white, fontWeight: 'bold'}]}>
              {quantity}
            </Text>

            <IconButton
            icon={Plus}
            iconSize={16}
            iconColor={palletteColors.appPrimary}
            backgroundColor={palletteColors.white}
            size={27}
            borderRadius={50}
            onpress={
              () => updateQuantity(food.id, quantity + 1)
            }
          />
          </View>
        )}


      </View>
    </View>

  )
}

export default RestaurantDetailMenu

export const menuStyles = (scale: LayoutScaleType, color: palleteColorsType) => {
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
      width: '60%',
      gap: scale.xsm_6
    },
    discount: {
      fontSize: scale.ms_12,
      textDecorationLine: 'line-through'
    },
    addButton: {
      position: 'absolute',
      bottom: 10,
      right: 10
    },
    quantityContainer: {
      borderRadius: 18,
      backgroundColor: color.appPrimary,
      flexDirection: 'row',
      alignItems: 'center',
      gap: scale.xs_4,
      padding: scale.xs_4
    },

    quantityText: {
      color: color.white,
      fontSize: 14,
      fontWeight: '700',
      minWidth: 20,
      textAlign: 'center',
    },
  })
}