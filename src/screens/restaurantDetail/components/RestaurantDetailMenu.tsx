import { View, Text, FlatList, StyleSheet, Image } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { RestaurantMenu } from '../types/types'
import SingleSelectionChips, { SelectionItem } from '../../../components/singleSelection/SignleSelectionChips'
import { useTheme } from '../../../constants/theme'
import { Plus, Star } from 'lucide-react-native'
import IconButton from '../../../components/IconButton'

type MenuProps = {
    menu: RestaurantMenu | undefined
}

const RestaurantDetailMenu = ({ menu }: MenuProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined)
  const categoryOptions: SelectionItem<string>[] = useMemo(
    () => menu?.categories.map((category) => ({
      id: category.id,
      label: category.name,
    })) ?? [],
    [menu?.categories]
  )
  const {typography, palletteColors} = useTheme()


  const filteredFoods = useMemo(() => {
    if (!menu) {
      return []
    }
    if (!selectedCategory) {
      return menu.foods
    }
    return menu.foods.filter((food) => food.categoryId === selectedCategory)
  }, [menu?.foods, menu, selectedCategory])

  if (!menu) {
    return <Text>No Menu Available</Text>
  }

  return (
    <View style={styles.container}>
      <SingleSelectionChips
        configs={categoryOptions}
        onSelectionChange={setSelectedCategory}
        scrolling={true}
      />

      {filteredFoods.length === 0 ? (
        <Text style={styles.emptyText}>No items available for this category.</Text>
      ) : (
        <FlatList
          data={filteredFoods}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => 
            (
            <View style={[styles.foodItem, typography.shadowCard]}>
               <Image source={{ uri: item.image }} style={styles.img} resizeMode='cover'/>
              
              <View style={styles.textContainer}>
                <Text style={styles.foodName}>{item.name}</Text>
              <Text  style={[typography.subtitle, { flexShrink:1}]}>{item.description}</Text>
              
              <View style={[{alignItems: 'baseline'},styles.foodItem]}>
                <Text style={styles.foodName}>₹{ item.discountPrice ? item.discountPrice : item.price}</Text>
                { item.discountPrice && 
                <Text style={[typography.subtitle, styles.discount]}>₹{item.price}</Text>
                }
                <Text style={typography.title}>{item.preparationTime} min</Text>
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
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
    </View>
  )
}

export default RestaurantDetailMenu

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  foodItem: {
   flexDirection: 'row',
   gap: 12,
   alignItems: 'center'
  },
  foodName: {
    fontSize: 16,
    fontWeight: '600',
  },
  separator: {
    paddingVertical: 5,
  },
  emptyText: {
    marginTop: 16,
    color: '#888',
  },
  img:{
      height: 80,
      width: 80,
      borderRadius: 10,
    },
    textContainer: {
      flex:1,
      gap: 6
    },
    discount: {
      fontSize: 12,
      textDecorationLine: 'line-through'
    },
    addButton:{
      position: 'absolute',
      bottom: 10,
      right: 10
    }
})