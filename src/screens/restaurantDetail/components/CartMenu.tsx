import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { LayoutScaleType, palleteColorsType, useTheme } from '../../../constants/theme'
import { ShoppingBag } from 'lucide-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import IconButton from '../../../components/IconButton'

const CartMenu = () => {
    const { scale, palletteColors, typography } = useTheme()
    const styles = menuStyles(scale, palletteColors)

    const added = false
    return (
        <View style={styles.wrapper}>
            {
                added ? <TouchableOpacity style={[styles.cartBox, styles.addedBox]}>
                    <View style={[typography.rowCenter, { gap: scale.ms_12 }]}>
                        <IconButton
                            icon={ShoppingBag}
                            iconColor={palletteColors.appPrimary}
                            iconSize={17}
                            backgroundColor={palletteColors.white}
                            size={35}
                            badge={1}
                        />
                        <Text style={[typography.title, styles.activeText]}>1 Item</Text>
                    </View>
                    <View style={{width: 1, height: '100%', backgroundColor: palletteColors.dullwhite}}/>
                    <Text style={[typography.title, styles.activeText]}>
                        {`View Cart - ₹139   >`}
                    </Text>
                </TouchableOpacity> :
                    <View style={[styles.cartBox, styles.emptyBox]}>
                        <IconButton
                            icon={ShoppingBag}
                            iconColor={palletteColors.black}
                            iconSize={17}
                            backgroundColor={palletteColors.white}
                            size={35}
                        />
                        <Text style={typography.title}>Add Food To Buy </Text>
                    </View>
            }
        </View>
    )
}

export default CartMenu

const menuStyles = (scale: LayoutScaleType, color: palleteColorsType) => {
    return StyleSheet.create({
        wrapper: {
            backgroundColor: color.white,
            alignItems: 'center'
        },
        cartBox: {
            flexDirection: 'row',
            marginVertical: scale.ms_12,
            width: '90%',
            alignItems: 'center',
            paddingVertical: scale.md_16,
            borderRadius: scale.xl_32
        },
        emptyBox: {
            justifyContent: 'center',
            gap: scale.ms_12,
            backgroundColor: color.appD4D4D4,
        },
        addedBox: {
            justifyContent: 'space-between',
            paddingHorizontal: scale.xl_18,
            backgroundColor: color.appPrimary,
        },
        activeText: {
            color: color.white,
            fontWeight: '500'
        }
    })
}