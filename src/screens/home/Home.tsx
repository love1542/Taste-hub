import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text, ActivityIndicator } from 'react-native';
import HomeHeader from './components/HomeHeader';
import { useAppBottomSheet } from '../../components/bottomSheet/hooks/useAppBottomSheet';
import SearchField from '../../components/searchField/SearchField';
import LocationPickerSheet from './components/LocationPickerSheet';
import SingleSelectionChips, { SelectionItem } from '../../components/singleSelection/SignleSelectionChips';
import { cuisines } from '../../data/cuisines.data';;
import { RestaurantModel } from '../../api/dto/restaurants.dto';
import RestaurantCell from './components/RestaurantCell';
import { RestaurantCellModel } from './components/RestaurantCell';
import { CuisineId } from '../../data/types';
import { useGetRestaurants } from './hooks/useQurrys';
import { useToggleFavourite } from './hooks/useMutation';
import { useDebounce } from '../../hooks/useDebounce';
import { useLocation } from '../../hooks/useLocation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList, ADD_ADDRESS_TYPE } from '../../navigation/type';
import { appRoutes } from '../../constants/appConstants';
import { useNavigation } from '@react-navigation/native';

type NavigationProps = NativeStackNavigationProp<AppStackParamList, typeof appRoutes.RestaurantDetail>

const Home = () => {
  const navigation = useNavigation<NavigationProps>()
  const [query, setQuery] = useState('')
  const search = useDebounce(query.trim(), 500)
  const { open, close } = useAppBottomSheet()
  const [cuisine, setCuisine] = useState<CuisineId | undefined>(undefined);
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useGetRestaurants({
    limit: 10,
    search: search || undefined,
    sortBy: 'name',
    sortOrder: 'ASC',
  });
  const { mutateAsync, data: toggleFavouriteRestaurant } = useToggleFavourite()
  const restaurants: RestaurantModel[] = data?.pages.flatMap(page => page.data.items) ?? []
  const [favouriteOverrides, setFavouriteOverrides] = useState<Record<string, boolean>>({})
  const { refreshCurrentLocation } = useLocation()
  const [selectedAddress, setSelectedAddress] = useState<{ label: string; addressLine: string } | null>(null)

  useEffect(() => {
    refreshCurrentLocation();
  }, [refreshCurrentLocation]);

  const cips: SelectionItem<CuisineId>[] = cuisines.map((value) => ({
    id: value.id as CuisineId,
    label: value.name,
  }));

  const visibleRestaurants = cuisine
    ? restaurants.filter(restaurant => restaurant.cuisines.some(item => item.id === cuisine))
    : restaurants;
  const restaurantsWithFavouriteOverrides: RestaurantCellModel[] = visibleRestaurants.map(restaurant => ({
    restaurantId: restaurant.restaurantId,
    name: restaurant.name,
    coverImage: restaurant.coverImage,
    isOpen: restaurant.isOpen,
    isFavourite: favouriteOverrides[restaurant.restaurantId] ?? restaurant.isFavourite,
    rating: restaurant.rating,
    address: [restaurant.location?.area, restaurant.location?.city, restaurant.location?.state].filter(Boolean).join(', ') || 'Location unavailable',
    deliveryEstimate: restaurant.minDeliveryMinutes != null && restaurant.maxDeliveryMinutes != null
      ? `Delivery ${restaurant.minDeliveryMinutes}-${restaurant.maxDeliveryMinutes} mins`
      : 'Delivery time unavailable',
  }))

  const handleToggleFavourite = async (id: string) => {
    console.log('toggle favourite pressed', id);
    console.log('response ', toggleFavouriteRestaurant)
    try {
      await mutateAsync(id);
      const restaurant = restaurants.find(item => item.restaurantId === id)
      if (restaurant) {
        setFavouriteOverrides(previous => ({
          ...previous,
          [id]: !(previous[id] ?? restaurant.isFavourite ?? false),
        }))
      }
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
      data={restaurantsWithFavouriteOverrides}
      keyExtractor={(item) => item.restaurantId}
      initialNumToRender={8}
      maxToRenderPerBatch={8}
      onEndReached={
        () => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage()
          }
        }
      }
      renderItem={({ item, index }) =>
        <View style={{ marginBottom: 16 }}>
            <RestaurantCell key={index} data={item}
            favPress={handleToggleFavourite}
            onCellPress={() => { navigation.navigate(appRoutes.RestaurantDetail, { restaurantId: item.restaurantId }) }} />
        </View>
      }
      ListHeaderComponent={
        <View style={styles.headerWrapper}>
          <HomeHeader query={query} onOpenSearch={openSeachPress} onLocationPress={openLocationPicker} selectedAddress={selectedAddress} />
          <SingleSelectionChips configs={cips} scrolling={true}
            onSelectionChange={(items) => {
              setCuisine(items);
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
        isFetchingNextPage ? <ActivityIndicator style={{ paddingTop: 20 }} /> : null
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
