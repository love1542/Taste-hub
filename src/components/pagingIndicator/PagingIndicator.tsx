import { View, Text } from 'react-native'
import React from 'react'
import PagingCells from './PagingCells';
import { pagingIndicatorStyles } from './pagingStyles';
import LongPagingLines from './longPagingLines';

type PagingIndicatorProps = {
  totalPages: number;
  currentPageIndex: number;
  long?: boolean;
};

const PagingIndicator = ({ totalPages, currentPageIndex, long = false }: PagingIndicatorProps) => {
  const dotsArray = Array.from({ length: totalPages });
  return (
    <View style={pagingIndicatorStyles.container}>
      {
        dotsArray.map((_, index) =>{
          const isActive = long ? currentPageIndex >= index : currentPageIndex == index
          return(
            <View key={index} style={{flex:1}}>
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