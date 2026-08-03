import React, { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, ScrollView, FlatList, TouchableOpacity, Text } from 'react-native';

import HomeHeader from './components/HomeHeader';
import { useAppBottomSheet } from '../../components/bottomSheet/hooks/useAppBottomSheet';
import SearchField from '../../components/searchField/SearchField';
import SingleSelectionChips, { SelectionItem } from '../../components/singleSelection/SignleSelectionChips';
import { cuisines } from '../../data/cuisines.data';
import { restaurants } from '../../data/Restaurants.data';
import RestaurantCell from './components/RestaurantCell';
import { CuisineId } from '../../data/types';
import { useGetRestaurants } from './hooks/useQurrys';

const Home = () => {
  const [query, setQuery] = useState('')
  const { open } = useAppBottomSheet()
  const [cuisine, setCuisine] = useState<CuisineId | undefined>(undefined);
  const [page, setPage] = useState<number>(1)
  const { data, isLoading, isError } = useGetRestaurants({ page, limit: 5, cuisine: cuisine });

  const restraunts = useMemo(()=>{
      return data?.data ?? []
  },[cuisine, page])

  const cips: SelectionItem<CuisineId>[] = cuisines.map((value) => ({
    id: value.id as CuisineId,
    label: value.name,
  }));


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
    <FlatList
      data={restraunts}
      keyExtractor={(item, index) => item.id ?? index.toString()}
      initialNumToRender={8}
      maxToRenderPerBatch={8}
      onEndReached={
        () => {setPage(page + 1);}
      }
      renderItem={({ item }) =>
        <TouchableOpacity style={{paddingVertical: 12}}>
          <RestaurantCell data={item} />
        </TouchableOpacity>
      }
      ListHeaderComponent={
        <View style={styles.headerWrapper}>
          <HomeHeader query={query} onOpenSearch={openSeachPress} />
          <SingleSelectionChips configs={cips} scrolling={true} 
          onSelectionChange={(items)=>{
            setCuisine(items)
          }}/>
        </View>
      }

      ListEmptyComponent={
        isLoading ? <Text>Loading...</Text> : <Text>No Restaurants Found</Text>
      }
    />

  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    flex: 1,
    backgroundColor: '#fff',
    gap: 16,
    marginBottom: 16
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
});

export default Home;
