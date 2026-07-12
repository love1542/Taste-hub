import { View, Text, StyleProp, ViewStyle } from 'react-native'
import React from 'react'
import PagingCells from './PagingCells';
import { pagingIndicatorStyles } from './pagingStyles';
import LongPagingLines from './longPagingLines';

type PagingIndicatorProps = {
  totalPages: number;
  currentPageIndex: number;
  long?: boolean;
  style?: StyleProp<ViewStyle>;
};

const PagingIndicator = ({ totalPages, currentPageIndex, long = false, style }: PagingIndicatorProps) => {
  const dotsArray = Array.from({ length: totalPages });
  return (
    <View style={[pagingIndicatorStyles.container, long && pagingIndicatorStyles.longContainer, style]}>
      {
        dotsArray.map((_, index) =>{
          const isActive = long ? currentPageIndex >= index : currentPageIndex == index
          return(
            <View key={index} style={long ? { flex: 1 } : undefined}>
              {
                long ? <LongPagingLines activeCell={isActive} /> : <PagingCells activeCell={isActive}/>
              }
            </View>
          )
        })
      }
    </View>
  )
}

export default PagingIndicator