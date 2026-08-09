import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Clock, Minus, Plus } from 'lucide-react-native'
import { LayoutScaleType, palleteColorsType, useTheme } from '../constants/theme'
import { useCart } from '../hooks'
import IconButton from './IconButton'

type CellProps = {
    foodId: string,
    image: string,
    name: string,
    description?: string,
    preparationTime: number,
    price: number,
    discountPrice: number | undefined,
    restaurantId: string
}


const FoodCell = ({ foodId,
    image,
    name,
    description,
    preparationTime,
    price,
    discountPrice,
    restaurantId
}: CellProps) => {
    const { scale, palletteColors, typography } = useTheme()

    const { addToCart, items, updateQuantity } = useCart()

    const plusClick = () => {
        addToCart({
            foodId: foodId,
            image: image,
            name: name,
            preparationTime: preparationTime,
            price: price,
            discountPrice: discountPrice,
            quantity: 1,
            restaurantId: restaurantId
        })
    }

    const cartItem = items.find(item => item.foodId === foodId);

    const quantity = cartItem?.quantity ?? 0;

    const styles = menuStyles(scale, palletteColors)


    return (
        <View style={[styles.foodItem, typography.shadowCard]}>
            <Image source={{ uri: image }} style={styles.img} resizeMode='cover' />

            <View style={styles.textContainer}>
                <Text style={styles.foodName}>{name}</Text>
                {
                    description && <Text style={[typography.subtitle, { flexShrink: 1 }]}>{description}</Text>

                }

                <View style={[{ alignItems: 'baseline' }, styles.foodItem]}>
                    <Text style={styles.foodName}>₹{discountPrice ? discountPrice : price}</Text>
                    {
                        discountPrice &&
                        <Text style={[typography.subtitle, styles.discount]}>₹{price}</Text>
                    }

                    <View style={{ width: 1, height: 10, backgroundColor: palletteColors.appD4D4D4 }} />
                    <View style={[typography.rowCenter, { gap: scale.xs_4 }]}>
                        <Clock size={15} color={palletteColors.appPrimary} />
                        <Text>{preparationTime} min</Text>
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
                            size={22}
                            borderRadius={50}
                            onpress={
                                () => updateQuantity(foodId, quantity - 1)
                            }
                        />

                        <Text style={[typography.title, { color: palletteColors.white, fontWeight: 'bold' }]}>
                            {quantity}
                        </Text>

                        <IconButton
                            icon={Plus}
                            iconSize={16}
                            iconColor={palletteColors.appPrimary}
                            backgroundColor={palletteColors.white}
                            size={22}
                            borderRadius={50}
                            onpress={
                                () => updateQuantity(foodId, quantity + 1)
                            }
                        />
                    </View>
                )}


            </View>
        </View>

    )
}

export default FoodCell

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
            width: 70,
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
            gap: scale.xsm_6,
            padding: scale.xs_4
        }
    })
}