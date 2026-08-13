import { View, Text, TouchableOpacity, ColorValue, StyleSheet } from 'react-native'
import React from 'react'
import { ArrowLeft } from 'lucide-react-native/icons';
import { ChevronLeftIcon } from 'lucide-react-native';
import { useTheme } from '../constants/theme';
import IconButton from './IconButton';

type HeaderProps = {
  title: string;
  onBackPress: () => void
  forgroundColor?: ColorValue | undefined
  backgroundColor?: ColorValue | undefined
}
const AppHeader = ({
  title,
  onBackPress,
  forgroundColor = '#FF6B35',
  backgroundColor = '#fcf1ec' }: HeaderProps) => {

  const { typography } = useTheme()
  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      {/* for future right button  */}
      <View style={styles.rightSide}>
        <IconButton
          backgroundColor={backgroundColor}
          icon={ChevronLeftIcon}
          iconSize={25}
          iconColor={forgroundColor}
          onpress={onBackPress}
          size={25}
        />
        <Text style={[typography.mdTitle, { color: forgroundColor }]}>{title}</Text>
      </View>
    </View>
  )
}

export default AppHeader

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: '100%',
    justifyContent: 'center',
  },
  rightSide: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginStart: 16
  }
})
