import { View, Text, Animated } from 'react-native'
import React, { useEffect, useMemo, useRef } from 'react'
import { pagingIndicatorStyles } from './pagingStyles'
import { width } from '../../constants/theme'

type longPagingLinesProps = {
    activeCell: boolean
}
const LongPagingLines = ({activeCell}: longPagingLinesProps) => {


  return (
    <View style={{ flex: 1}}>
      <View 
      style={[activeCell ? pagingIndicatorStyles.longActiveIndicator : pagingIndicatorStyles.longInactiveIndicator ]}
      />
    </View>
  )
}

export default LongPagingLines