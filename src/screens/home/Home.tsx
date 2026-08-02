import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';

import HomeHeader from './components/HomeHeader';
import { useAppBottomSheet } from '../../components/bottomSheet/hooks/useAppBottomSheet';
import SearchField from '../../components/searchField/SearchField';
import SingleSelectionChips, { SelectionItem } from '../../components/singleSelection/SignleSelectionChips';
import { cuisines } from '../../data/cuisines.data';
import { restaurants } from '../../data/Restaurants.data';
import RestaurantCell from './components/RestaurantCell';

const Home = () => {
  const [query, setQuery] = useState('')
  const { open } = useAppBottomSheet()
  const [selectedChip, setSelectedChip] = useState<string | null>(null);
  
  const data: SelectionItem[] = cuisines.map((cuisine) => ({
    id: cuisine.id,
    label: cuisine.name,
    img: cuisine.image,
  }));

  const restraunt = restaurants.filter((restaurant) => {
    const matchesQuery = restaurant.name.toLowerCase().includes("Domino's Pizza".toLowerCase());

    return matchesQuery 
  });


  const openSeachPress = () => {
    open({
      content: <View>
        <SearchField
          value={query}
          placeholder='Search Best Restraunt & Food'
          onChange={setQuery}
          onClear={() => { setQuery('') }}
          autoFocus={true}
        />
      </View>,
      snapPoints: ['100%'],
      enablePanDownToClose: true
    })
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <HomeHeader query={query} onOpenSearch={openSeachPress} />
        
        <SingleSelectionChips 
        configs={data}
        scrolling={true}
        />

      <RestaurantCell 
      data={restraunt[0]}
      />
      </View>
    </TouchableWithoutFeedback>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
});

export default Home;
