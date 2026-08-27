import { View, Text, ColorValue, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { ChevronLeftIcon } from 'lucide-react-native';
import { useTheme } from '../constants/theme';
import IconButton from './IconButton';

type HeaderProps = {
  title: string;
  onBackPress: () => void
  forgroundColor?: ColorValue | undefined
  backgroundColor?: ColorValue | undefined
  rightText?: string,
  rightAction?: () => void
}
const AppHeader = ({
  title,
  onBackPress,
  forgroundColor = '#FF6B35',
  backgroundColor = '#fcf1ec',
  rightText,
  rightAction
}: HeaderProps) => {

  const { typography } = useTheme()
  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <View style={styles.leftSide}>
        <IconButton
          backgroundColor={backgroundColor}
          icon={ChevronLeftIcon}
          iconSize={25}
          iconColor={forgroundColor}
          onpress={onBackPress}
          size={25}
        />
        <Text style={[typography.mdTitle, { color: forgroundColor, marginVertical:8 }]}>{title}</Text>
      </View>

      {
        rightText && <Pressable onPress={rightAction} style={styles.addButton}>
        <Text style={[typography.mdTitle, { color: forgroundColor }]}>Add</Text>
      </Pressable>

      }

      
    </View>
  )
}

export default AppHeader

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 16,
    marginVertical:5
  },
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  addText: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  }
})
