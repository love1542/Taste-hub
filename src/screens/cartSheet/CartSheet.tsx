import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useCart } from '../../hooks';
import LeftIconWithTextButton from '../../components/LeftIconWithTextButton';
import { LayoutScaleType, palleteColorsType, useTheme } from '../../constants/theme';
import { ArrowRight } from 'lucide-react-native';
import FoodCell from '../../components/FoodCell';


const CartSheet = () => {
  const { palletteColors, scale, typography } = useTheme()
  const { items } = useCart()
  const styles = sheetStyle(palletteColors, scale)

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
        />
      </View>

      {/* Items  */}

      <ScrollView 
      showsVerticalScrollIndicator = {false}
      style={{maxHeight: '40%'}}>
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
                />
              </View>
            )
          })
        }
      </ScrollView>

      <View style={styles.itemInfo}>
        {menuDetail(
          'Estimated time',
          '21 min'
        )}
        {menuDetail(
          'Subtotal',
          '₹230'
        )}
        {menuDetail(
          'Discount',
          '- ₹20',
          true
        )}
        {menuDetail(
          'Delivery fee',
          '₹10'
        )}

        <View style={typography.borderLine} />

        <View style={[typography.rowCenter, { justifyContent: 'space-between' }]}>
          <Text style={typography.subHeading}>Total</Text>
          <Text style={typography.subHeading}>23</Text>
        </View>

        <TouchableOpacity
          onPress={() => { console.log('checkout') }}
          style={styles.buttonWrapper}
        >
          <Text style={[typography.title, styles.btnText]}>View & Checkout</Text>
          <View style={[typography.rowCenter, { gap: scale.sm_8 }]}>
            <Text style={[typography.title, styles.btnText]}>24</Text>
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