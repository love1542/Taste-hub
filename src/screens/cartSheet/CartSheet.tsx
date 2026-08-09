import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useMemo } from 'react';
import { useCart } from '../../hooks';
import LeftIconWithTextButton from '../../components/LeftIconWithTextButton';
import { LayoutScaleType, palleteColorsType, useTheme } from '../../constants/theme';
import { ArrowRight, ShoppingBag } from 'lucide-react-native';
import FoodCell from '../../components/FoodCell';


const CartSheet = () => {
  const { palletteColors, scale, typography } = useTheme()
  const { items, clearCart, price, totalDiscount, totalPrice, deliveryFee } = useCart()
  const styles = sheetStyle(palletteColors, scale)

  const estimateTime = useMemo(() => {
    return items.reduce(
        (max, item) => Math.max(max, item.preparationTime),
        0
    );
}, [items]);

  const menuDetail = (title: string, value: string | number, green?: boolean) => {
    return (
      <View style={[typography.rowCenter, { justifyContent: 'space-between' }]}>
        <Text style={{ color: palletteColors.app737373 }}>{title}</Text>
        <Text style={{ color: green ? palletteColors.green : palletteColors.black }}>{value}</Text>
      </View>
    )
  }

  return (
    <View style={styles.contianer}>
      {/* Headder */}
      <View style={[, typography.rowCenter, { justifyContent: 'space-between' }]}>
        <View>
          <Text style={typography.subHeading}>Your Cart</Text>
          <Text style={typography.subtitle}>{`${items.length} ${items.length < 1 ? 'item' : 'items'}`}</Text>
        </View>
        <LeftIconWithTextButton
          text='Clear'
          colors={[palletteColors.appPrimary, palletteColors.appPrimary]}
          textStyle={{ color: palletteColors.white }}
          onPress={clearCart}
        />
      </View>

      {/* Items  */}

      <ScrollView 
      showsVerticalScrollIndicator = {false}
      style={{maxHeight: 250}}>
        {
          items.map((item) => {
            return (
              <View key={item.foodId}>
                <FoodCell
                  foodId={item.foodId}
                  name={item.name}
                  discountPrice={item.discountPrice}
                  image={item.image}
                  preparationTime={item.preparationTime}
                  price={item.price}
                  restaurantId={item.restaurantId}
                  deliveryFee={item.deliveryFee}
                />
              </View>
            )
          })
        }
      </ScrollView>

      <View style={styles.itemInfo}>
        {menuDetail(
          'Estimated time',
          `${estimateTime} min`
        )}
        {menuDetail(
          'Subtotal',
          `₹${price}`
        )}
        {menuDetail(
          'Discount',
          `- ₹${totalDiscount}`,
          true
        )}
        {menuDetail(
          'Delivery fee',
          `₹${deliveryFee}`
        )}

        <View style={typography.borderLine} />

        <View style={[typography.rowCenter, { justifyContent: 'space-between' }]}>
          <Text style={typography.subHeading}>Total</Text>
          <Text style={typography.subHeading}>₹{totalPrice}</Text>
        </View>

        <TouchableOpacity
          onPress={() => { console.log('checkout') }}
          style={styles.buttonWrapper}
        >
          <View style={typography.rowCenter}>
            <ShoppingBag color={palletteColors.white}/>
          <Text style={[typography.title, styles.btnText]}>View & Checkout</Text>
          </View>
          <View style={[typography.rowCenter, { gap: scale.sm_8 }]}>
            <Text style={[typography.title, styles.btnText]}>₹{totalPrice}</Text>
            <ArrowRight size={20} color={palletteColors.white} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartSheet;

const sheetStyle = (color: palleteColorsType, scale: LayoutScaleType) => {
  return StyleSheet.create({
    contianer: {
      gap: scale.ms_12
    },
    header: {
      flex: 1,
      flexDirection: 'row'
    },
    itemInfo: {
      gap: scale.sm_8
    },
    buttonWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: scale.ms_12,
      paddingVertical: scale.ml_20,
      backgroundColor: color.appPrimary,
      borderRadius: scale.ml_20,
    },
    btnText: {
      fontWeight: '500',
      color: color.white
    }
  })
}