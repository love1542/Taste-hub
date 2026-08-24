import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import SearchField from './searchField/SearchField'
import { ScrollView } from 'react-native-gesture-handler'
import { useGetLocations } from '../screens/home/hooks/useQurrys'
import { LayoutScaleType, useTheme } from '../constants/theme'
import { useDebounce } from '../hooks/useDebounce'
import { NominatimSearchResponseDto } from '../dto/location'

type SheetProps = {
  locationPress: (location: NominatimSearchResponseDto) => void
}

const SearchLocationSheet = ({ locationPress }: SheetProps) => {
  const [value, setValue] = useState<string>('')
  const debouncedValue = useDebounce(value, 800)
  const { data, isLoading } = useGetLocations(debouncedValue)

  const { typography, scale } = useTheme()
  const styles = sheetStyles(scale)

  return (
    <View style={styles.container}>

      <SearchField
        value={value}
        placeholder="Search address..."
        onChange={setValue}
        onClear={() => setValue('')}
        autoFocus
        borderColor="black"
      />

      <ScrollView
        style={styles.scrollView}
      >
        {isLoading && <Text>Loading...</Text>}

        {value.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text>Please Search</Text>
          </View>
        )}

        {data?.map(item => (
          <TouchableOpacity
            key={item.place_id}
            style={styles.locationCellWrapper}
            onPress={() => locationPress(item)}
          >
            <Text
              style={typography.title}
              numberOfLines={2}
            >
              {item.display_name}
            </Text>

            <View style={typography.borderLine} />
          </TouchableOpacity>
        ))}

        {value.length >= 3 &&
          !isLoading &&
          data?.length === 0 && (
            <Text>Not Found</Text>
          )}
      </ScrollView>
    </View>
  );
}

export default SearchLocationSheet


const sheetStyles = (scale: LayoutScaleType) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      gap: scale.sm_8
    },

    scrollView: {
      flex: 1,
    },

    emptyContainer: {
      height: 130,
      justifyContent: 'center',
      alignItems: 'center',
    },

    locationCellWrapper: {
      paddingVertical: scale.sm_8,
      gap: scale.xs_4,
    },
  });
};