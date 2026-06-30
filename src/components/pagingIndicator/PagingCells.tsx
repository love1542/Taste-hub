import { View, Text, Animated } from 'react-native'
import React, { useEffect, useMemo, useRef } from 'react'
import { pagingIndicatorStyles } from './pagingStyles'
import { width } from '../../constants/theme'

type PagingCellsProps = {
    activeCell: boolean
}
const PagingCells = ({activeCell}: PagingCellsProps) => {

  const widthAnim = useRef(new Animated.Value(7)).current;

useEffect(() => {
  Animated.timing(widthAnim, {
    toValue: activeCell ? 28 : 7,
    useNativeDriver: false, 
    duration: 450
  }).start();
}, [activeCell]);

  return (
    <View >
      <Animated.View 
      style={[activeCell ? pagingIndicatorStyles.activeIndicator : pagingIndicatorStyles.inactiveIndicator, {width: widthAnim} ]}
      />
    </View>
  )
}

export default PagingCells