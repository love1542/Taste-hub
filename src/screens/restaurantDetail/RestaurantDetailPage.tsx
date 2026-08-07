import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { useGetRestaurantById, useGetRestaurantMenu } from './hooks/useQurries'
import { appRoutes } from '../../constants/appConstants'
import { AppStackParamList } from '../../navigation/type'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import HeroSection from './components/HeroSection'
import { LayoutScaleType, palleteColorsType, useTheme } from '../../constants/theme'
import RestaurantPropertiesCell from './components/RestaurantPropertiesCell'
import { ChevronRight, Clock, LucideIcon, MapPin } from 'lucide-react-native'
import RestaurantDetailMenu from './components/RestaurantDetailMenu'
import IconButton from '../../components/IconButton'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'


type Props = RouteProp<AppStackParamList, typeof appRoutes.RestaurantDetail>
type NavigationType = NativeStackNavigationProp<AppStackParamList , 'RestaurantDetail' >
  
  
const RestaurantDetailPage = () => {
  const { scale, palletteColors, typography } = useTheme()
  const navigation = useNavigation<NavigationType>()
  const styles = detailStyles(scale, palletteColors)
  const route = useRoute<Props>()
  const restaurantId = route.params.restaurantId
  const { isLoading: isRestaurantLoading, data: restaurantData } = useGetRestaurantById(restaurantId)
  const { isLoading: isMenuLoading, data: menuData } = useGetRestaurantMenu(restaurantId)

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
            <Text style={{color: palletteColors.appPrimary}}>Click</Text>
            <ChevronRight size={20} color={palletteColors.appPrimary}/>
          </TouchableOpacity>
        }

      </View>
    )
  }
  return (
    <ScrollView style={styles.container}>
      <HeroSection 
      restaturant={restaurantData.data} 
      onbackPress={()=>{navigation.pop()}}
      onHeartTap={()=>{console.log("like")}}
      />
      <View style={styles.imgCell}>
        <RestaurantPropertiesCell restaturant={restaurantData.data} />

        <Text style={typography.subHeading}>About</Text>
        <View style={typography.shadowCard}>
          <Text>{restaurantData.data.description}</Text>
        </View>

        <Text style={typography.subHeading}>Restarunt Info</Text>
        {infoCell(
          MapPin,
          "LOCATION",
          restaurantData.data.address,
          () => {console.log("go to map")}
        )}

        {infoCell(
          Clock,
          "OPENING HOURS",
          `${restaurantData.data.openingHours} ${restaurantData.data.isOpen ? '(Open Now)' : '(Closed Now)'}`
        )}

        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems: 'center'}}>
        <Text style={typography.subHeading}>Popular Menu</Text>
        <Text>{`${menuData?.data?.foods.length} Total Items`}</Text>
        </View>
        
        <RestaurantDetailMenu menu={menuData?.data} />

      </View>


    </ScrollView>
  )
}

export default RestaurantDetailPage

const detailStyles = (scale: LayoutScaleType, color: palleteColorsType) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      color: color.dullwhite
    },
    imgCell: {
      transform: [
        { translateY: -40 }
      ],
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
  })
}