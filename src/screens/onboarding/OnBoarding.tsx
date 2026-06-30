import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useRef, useState } from 'react'
import OnBoardingBackground from './components/OnBoardingBackground'
import { useOnBoardingStyles } from './onBoarding.styles'
import LeftIconWithTextButton from '../../components/LeftIconWithTextButton'
import OnBoardingForground from './components/OnBoardingForground'
import { onBoardingData } from './onBoardingdata'
import { width } from '../../constants/theme'
import PagingIndicator from '../../components/pagingIndicator/PagingIndicator'


const OnBoarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const styles = useOnBoardingStyles()

  const flatListRef = useRef<FlatList<any> | null>(null);

  const nextTap = () => {
    if (currentIndex < onBoardingData.length - 1) {
      const nextIndex = currentIndex + 1
      setCurrentIndex(nextIndex)

      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true
      })
    } else {
      console.log("last screen")
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={onBoardingData}
        ref={flatListRef}
        style={styles.flatList}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
        renderItem={({ item }) => (
          <View style={[styles.page, { width }]}>            
            <View style={styles.bg}>
              <OnBoardingBackground image={item.bgImage} />
            </View>

            <View style={styles.rapper}>
              <OnBoardingForground
                chipText={item.chipText}
                title={item.title}
                discription={item.description}
                chipColors={item.colors}
              />
            </View>
          </View>
        )}
      />

      <View style={[styles.bottomButtonContainer, styles.bottomOverlay]}>
        <PagingIndicator currentPageIndex={currentIndex} totalPages={onBoardingData.length} />

        <LeftIconWithTextButton
          onPress={nextTap}
          icon={require('../../../assets/icons/rightArrow.png')}
          style={styles.nextButtonStyle}
        />
      </View>
    </View>
  )
}

export default OnBoarding
