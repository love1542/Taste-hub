import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text, ActivityIndicator } from 'react-native';
import HomeHeader from './components/HomeHeader';
import { useAppBottomSheet } from '../../components/bottomSheet/hooks/useAppBottomSheet';
import SearchField from '../../components/searchField/SearchField';
import LocationPickerSheet from './components/LocationPickerSheet';
import SingleSelectionChips, { SelectionItem } from '../../components/singleSelection/SignleSelectionChips';
import { cuisines } from '../../data/cuisines.data';;
import RestaurantCell from './components/RestaurantCell';
import { CuisineId, Restaurant } from '../../data/types';
import { useGetRestaurants } from './hooks/useQurrys';
import { useToggleFavourite } from './hooks/useMutation';
import { useLocation } from '../../hooks/useLocation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList, ADD_ADDRESS_TYPE } from '../../navigation/type';
import { appRoutes } from '../../constants/appConstants';
import { useNavigation } from '@react-navigation/native';

type NavigationProps = NativeStackNavigationProp<AppStackParamList, typeof appRoutes.RestaurantDetail>

const Home = () => {
  const navigation = useNavigation<NavigationProps>()
  const [query, setQuery] = useState('')
  const { open, close } = useAppBottomSheet()
  const [cuisine, setCuisine] = useState<CuisineId | undefined>(undefined);
  const [page, setPage] = useState<number>(0)
  const { data, isLoading, isError } = useGetRestaurants({ page, limit: 5, cuisine: cuisine });
  const { mutateAsync, data: toggleFavouriteRestaurant } = useToggleFavourite()
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const { refreshCurrentLocation } = useLocation()
  const [selectedAddress, setSelectedAddress] = useState<{ label: string; addressLine: string } | null>(null)

  useEffect(() => {
    refreshCurrentLocation();
  }, []);

  useEffect(() => {
    const nextRestaurants = data?.data ?? [];

    if (page === 0) {
      setRestaurants(nextRestaurants);
    } else {
      setRestaurants(prev => {
        const existingIds = new Set(prev.map(r => r.id));
        const unique = nextRestaurants.filter(r => !existingIds.has(r.id));
        return [...prev, ...unique];
      });
    }

  }, [data]);



  const cips: SelectionItem<CuisineId>[] = cuisines.map((value) => ({
    id: value.id as CuisineId,
    label: value.name,
  }));

  const handleToggleFavourite = async (id: string) => {
    console.log('toggle favourite pressed', id);
    console.log('response ', toggleFavouriteRestaurant)
    try {
      await mutateAsync(id);
      setRestaurants(prevRestaurants =>
        prevRestaurants.map(restaurant =>
          restaurant.id === id ? { ...restaurant, isFavourite: !restaurant.isFavourite } : restaurant
        )
      );
    } catch (error) {
      console.error('Error toggling favourite:', error);
    }
  };

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
  const openLocationPicker = () => {
    open({
      title: '',
      content: <LocationPickerSheet
        onClose={close}
        onAddNew={() => navigation.navigate(appRoutes.addAdress, { screenType: ADD_ADDRESS_TYPE.ADD })}
        onSelectAddress={(label, addressLine) => setSelectedAddress({ label, addressLine })}
        onSelectCurrentLocation={() => setSelectedAddress(null)}
      />,
      snapPoints: ['60%', '85%', '90%'],
      enablePanDownToClose: true,
    })
  }

  return (
    <FlatList
      data={restaurants}
      keyExtractor={(item) => item.id}
      initialNumToRender={8}
      maxToRenderPerBatch={8}
      onEndReached={
        () => {
          if (data?.pagination.hasNextPage) {
            setPage(prev => prev + 1)
          }
        }
      }
      renderItem={({ item, index }) =>
        <View style={{ marginBottom: 16 }}>
          <RestaurantCell key={index} data={item}
            favPress={handleToggleFavourite}
            onCellPress={() => { navigation.navigate(appRoutes.RestaurantDetail, { restaurantId: item.id }) }} />
        </View>
      }
      ListHeaderComponent={
        <View style={styles.headerWrapper}>
          <HomeHeader query={query} onOpenSearch={openSeachPress} onLocationPress={openLocationPicker} selectedAddress={selectedAddress} />
          <SingleSelectionChips configs={cips} scrolling={true}
            onSelectionChange={(items) => {
              setCuisine(items);
              setPage(0)
            }} />
        </View>
      }

      ListEmptyComponent={
        isLoading ?
          <View style={styles.centerStateWrapper}>
            <ActivityIndicator size={20} />
          </View>
          :
          <View style={styles.centerStateWrapper}>
            <Text>No Restaurant Register Yet</Text>
          </View>
      }

      ListFooterComponent={
        (isLoading && restaurants.length > 1) ? <ActivityIndicator style={{ paddingTop: 20 }} /> : null
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
  centerStateWrapper: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  restaurantItem: {
    marginBottom: 16,
  }
});

export default Home;
