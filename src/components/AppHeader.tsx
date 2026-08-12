import { View, Text, TouchableOpacity, ColorValue, StyleSheet } from 'react-native'
import React from 'react'
import { ArrowLeft } from 'lucide-react-native/icons';
import { ChevronLeftIcon } from 'lucide-react-native';
import { useTheme } from '../constants/theme';

type HeaderProps = {
    title: string;
    onBackPress: () => void
    forgroundColor?: ColorValue | undefined
    backgroundColor?: ColorValue | undefined
}
const AppHeader = ({
    title,
     onBackPress, 
     forgroundColor = 'white', 
     backgroundColor = '#FF6B35'}:HeaderProps) => {

        const {typography} = useTheme()
  return (
    <View style={[styles.container, {backgroundColor: backgroundColor}]}>
        {/* for future right button  */}
      <View style={styles.rightSide}>
        <TouchableOpacity onPress={onBackPress}>
            <ChevronLeftIcon size={25} color={forgroundColor} />
        </TouchableOpacity>
        <Text style={[typography.mdTitle, {color: forgroundColor}]}>{title}</Text>
      </View>
    </View>
  )
}

export default AppHeader

const styles = StyleSheet.create({
        container:{
           height: 40,
           width: '100%',
            justifyContent: 'center',
        },
        rightSide:{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            marginStart: 5
        }
    })
