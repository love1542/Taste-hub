import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { MapPin as LocationPin } from 'lucide-react-native';
import {
  Map,
  Camera,
  Marker,
} from '@maplibre/maplibre-react-native';

import { AppStackParamList } from '../../navigation/type';
import { appRoutes } from '../../constants/appConstants';
import { LayoutScaleType, palleteColorsType, useTheme } from '../../constants/theme';
import AppHeader from '../../components/AppHeader';
import AppButton from '../../components/AppButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AddressCell from '../adresses/components/AddressCell';
import { useAddAddress } from '../adresses/hooks/mutationHooks';

type RouteProps = RouteProp<
  AppStackParamList,
  typeof appRoutes.confirmAdress
>;

type NavigationType = NativeStackNavigationProp<AppStackParamList, typeof appRoutes.confirmAdress>
const ConfirmAdress = () => {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation<NavigationType>()

  const deliveryAdress = route.params.address;

  const latitude = Number(deliveryAdress.latitude);
  const longitude = Number(deliveryAdress.longitude);
  // const [markerCoordinate, setMarkerCoordinate] = React.useState<
  //   [number, number]
  // >([longitude, latitude]);

  const { palletteColors, scale } = useTheme()
  const styles = screenStyles(scale, palletteColors)

  const { mutate: saveAddress, isPending } = useAddAddress()

  const onConfirmTap = () => {
    saveAddress(deliveryAdress, {
      onSuccess: () => {
        navigation.popTo('ManageAdress')
      },
    })
  }

  return (
    <View style={styles.container}>

      <AppHeader
        title='Confirm Address'
        onBackPress={() => { navigation.goBack() }}
      />

      {/* Map  */}

      <Map
        style={styles.map}
        mapStyle="https://tiles.openfreemap.org/styles/liberty"
        onPress={event => {
          // const [nextLongitude, nextLatitude] = event.nativeEvent.lngLat;
          console.log("full", event)
          // setMarkerCoordinate([nextLongitude, nextLatitude]);
          // console.log('Selected location:', {
          //   longitude: nextLongitude,
          //   latitude: nextLatitude,
          // });
        }}
        onDidFailLoadingMap={() => {
          console.warn('MapLibre failed to load map tiles');
        }}
      >
        <Camera
          initialViewState={{
            center: [longitude, latitude],
            zoom: 15,
          }}
        />
        <Marker
          id={deliveryAdress.id}
          lngLat={[longitude, latitude]}
          anchor="bottom"
        >
          <View style={styles.marker}>
            <LocationPin size={38} color={palletteColors.appPrimary} />
          </View>
        </Marker>
      </Map>


      <View style={styles.bottomView}>
        <AddressCell
          address={deliveryAdress}
        />
        <View style={styles.saveWrapper}>
          <AppButton
            colors={[palletteColors.appPrimary, palletteColors.appPrimary2]}
            text={isPending ? 'loading' : 'Confirm Address'}
            onPress={onConfirmTap}
            disabled={isPending}
          />
        </View>

      </View>

    </View>
  );
};

const screenStyles = (scale: LayoutScaleType, color: palleteColorsType) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.background
    },

    map: {
      flex: 1
    },

    marker: {
      alignItems: 'center',
      justifyContent: 'center',
    },

    bottomView: {
      gap: scale.ms_12,
      backgroundColor: color.white,
    },

    saveWrapper: {
      paddingHorizontal: scale.md_16,
      paddingBottom: scale.md_16,
      paddingTop: scale.sm_8,
    },
  });
}

export default ConfirmAdress;