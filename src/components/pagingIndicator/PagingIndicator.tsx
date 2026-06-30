import { View, Text } from 'react-native'
import React from 'react'
import PagingCells from './PagingCells';
import { pagingIndicatorStyles } from './pagingStyles';

type PagingIndicatorProps = {
  totalPages: number;
  currentPageIndex: number;
};

const PagingIndicator = ({ totalPages, currentPageIndex }: PagingIndicatorProps) => {
  const dotsArray = Array.from({ length: totalPages });
  return (
    <View style={pagingIndicatorStyles.container}>
      {
        dotsArray.map((_, index) =>{
          const isActive = currentPageIndex == index
          return(
            <View key={index} >
              <PagingCells activeCell={isActive}/>
              </View>
          )
        })
}
    </View>
  )
}

export default PagingIndicator