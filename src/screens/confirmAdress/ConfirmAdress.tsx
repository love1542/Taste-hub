import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin as LocationPin } from 'lucide-react-native';
import {
  Map,
  Camera,
  Marker,
} from '@maplibre/maplibre-react-native';

import { AppStackParamList } from '../../navigation/type';
import { appRoutes } from '../../constants/appConstants';
import { useTheme } from '../../constants/theme';

type RouteProps = RouteProp<
  AppStackParamList,
  typeof appRoutes.confirmAdress
>;

const ConfirmAdress = () => {
  const route = useRoute<RouteProps>();

  const deliveryAdress = route.params.address;

  const latitude = Number(deliveryAdress.latitude);
  const longitude = Number(deliveryAdress.longitude);
  // const [markerCoordinate, setMarkerCoordinate] = React.useState<
  //   [number, number]
  // >([longitude, latitude]);

  const { palletteColors } = useTheme()

  return (
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    height: '40%'
  },

  marker: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ConfirmAdress;