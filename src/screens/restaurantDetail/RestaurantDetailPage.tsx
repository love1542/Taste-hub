import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import React, { useMemo, useState } from 'react'
import { useGetRestaurantById, useGetRestaurantMenu } from './hooks/useQurries'
import { appRoutes } from '../../constants/appConstants'
import { AppStackParamList } from '../../navigation/type'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import HeroSection from './components/HeroSection'
import { LayoutScaleType, palleteColorsType, useTheme } from '../../constants/theme'
import RestaurantPropertiesCell from './components/RestaurantPropertiesCell'
import { ChevronRight, Clock, LucideIcon, MapPin, Plus } from 'lucide-react-native'
import IconButton from '../../components/IconButton'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import SingleSelectionChips, { SelectionItem } from '../../components/singleSelection/SignleSelectionChips'
import CartMenu from './components/CartMenu'
import FoodCell from '../../components/FoodCell'


type Props = RouteProp<AppStackParamList, typeof appRoutes.RestaurantDetail>
type NavigationType = NativeStackNavigationProp<AppStackParamList, 'RestaurantDetail'>


const RestaurantDetailPage = () => {
  const { scale, palletteColors, typography } = useTheme()
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined)
  const navigation = useNavigation<NavigationType>()
  const styles = detailStyles(scale, palletteColors)
  const route = useRoute<Props>()
  const restaurantId = route.params.restaurantId
  const { isLoading: isRestaurantLoading, data: restaurantData } = useGetRestaurantById(restaurantId)
  const { isLoading: isMenuLoading, data: menuData } = useGetRestaurantMenu(restaurantId)

  const loading = isMenuLoading || isRestaurantLoading

  const categoryOptions: SelectionItem<string>[] = useMemo(
    () => menuData?.data?.categories.map((category) => ({
      id: category.id,
      label: category.name,
    })) ?? [],
    [menuData?.data?.categories]
  )


  const filteredFoods = useMemo(() => {
    if (!menuData?.data) {
      return []
    }
    if (!selectedCategory) {
      return menuData.data.foods
    }
    return menuData.data.foods.filter((food) => food.categoryId === selectedCategory)
  }, [menuData?.data, selectedCategory])

  if (loading) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator /></View>
  }

  if (!restaurantData?.data) {
    return <Text>no restaturant</Text>
  }

  const infoCell = (icon: LucideIcon, title: string, des: string, onClick?: () => void) => {
    const Icon = icon
    return (
      <View style={[typography.shadowCard, styles.infoRow]}>
        <IconButton
          icon={Icon}
          iconSize={20}
          size={30}
          backgroundColor={palletteColors.appPrimary}
        />
        <View style={styles.infoText}>
          <Text style={typography.subtitle}>{title}</Text>
          <Text style={typography.title}>{des}</Text>
        </View>

        {
          onClick &&
          <TouchableOpacity
            onPress={onClick}
            style={styles.actionButton}
          >
            <Text style={{ color: palletteColors.appPrimary }}>Click</Text>
            <ChevronRight size={20} color={palletteColors.appPrimary} />
          </TouchableOpacity>
        }

      </View>
    )
  }
  return (
    <>
      <FlatList
        data={filteredFoods}
        ListFooterComponent={<View style={{ height: scale.sm_8 }} />}
        ListHeaderComponent={
          <View style={styles.container}>
            <HeroSection
              restaturant={restaurantData.data}
              onbackPress={() => { navigation.pop() }}
              onHeartTap={() => { console.log("like") }}
            />

            <View style={styles.dataWrapper}>
              <View >
                <RestaurantPropertiesCell restaturant={restaurantData.data} />
              </View>


              <Text style={typography.subHeading}>About</Text>
              <View style={typography.shadowCard}>
                <Text>{restaurantData.data.description}</Text>
              </View>

              <Text style={typography.subHeading}>Restarunt Info</Text>
              {infoCell(
                MapPin,
                "LOCATION",
                restaurantData.data.address,
                () => { console.log("go to map") }
              )}

              {infoCell(
                Clock,
                "OPENING HOURS",
                `${restaurantData.data.openingHours} ${restaurantData.data.isOpen ? '(Open Now)' : '(Closed Now)'}`
              )}

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={typography.subHeading}>Popular Menu</Text>
                <Text>{`${menuData?.data?.foods.length} Total Items`}</Text>
              </View>

              <SingleSelectionChips
                configs={categoryOptions}
                onSelectionChange={setSelectedCategory}
                scrolling={true}
              />
            </View>
          </View>
        }
        renderItem={({ item }) =>
        (
          <View style={{ paddingHorizontal: scale.md_16 }}>
            <FoodCell
              foodId={item.id}
              name={item.name}
              discountPrice={item.discountPrice}
              image={item.image}
              preparationTime={item.preparationTime}
              price={item.price}
              restaurantId={item.restaurantId}
              description={item.description}
              deliveryFee={restaurantData.data?.deliveryFee ?? 0}
            />
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ paddingVertical: scale.xsm_6 }} />}
      />
      <CartMenu />
    </>


  )
}

export default RestaurantDetailPage

const detailStyles = (scale: LayoutScaleType, color: palleteColorsType) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      color: color.dullwhite,
      paddingBottom: scale.md_16
    },
    dataWrapper: {
      marginTop: -40,
      paddingHorizontal: scale.md_16,
      gap: scale.ms_12
    },
    infoRow: {
      flexDirection: "row",
      alignItems: "center"
    },

    infoText: {
      marginLeft: scale.ms_12,
      flex: 1,
      gap: scale.xs_4
    },

    actionButton: {
      flexDirection: "row",
      alignItems: "center",
      gap: scale.xs_4
    },
    cartMenu: {
      position: 'absolute',
      bottom: 5
    }
  })
}