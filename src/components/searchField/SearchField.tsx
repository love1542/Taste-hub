import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Search, X } from 'lucide-react-native'
import { palleteColorsType } from '../../constants/theme/paletteColors'
import { LayoutScaleType } from '../../constants/theme/layoutScales'
import { useTheme } from '../../constants/theme'


type SearchProps = {
  value: string
  placeholder: string
  onChange: (text: string) => void
  onClear: () => void
  borderColor?: string
  editable?: boolean,
  autoFocus?: boolean
  onPress?: () => void
}

const SearchField = ({value, 
  onChange, 
  placeholder, 
  onClear, 
  borderColor = 'white',
  editable = true,
  autoFocus = false,
  onPress
}:SearchProps) => {
  const [isFocus, setIsFocus] = useState<boolean>(false)
  const {scale, palletteColors} = useTheme()
  const styles = searchStyle(scale, palletteColors)
  const showClear = value.length != 0

  const content =  (
    <View style={[styles.fieldWrapper, {borderColor: borderColor}]}>
      <View style={{marginStart: 12}}>
        <Search size={23} />
      </View>

      <TextInput
        value={value}
        placeholder={placeholder}
        onChangeText={(text: string) => onChange(text)}
        onFocus={() => { setIsFocus(true) }}
        onBlur={() => { setIsFocus(false) }}
        style={styles.field}
        returnKeyType="search"
        autoFocus={autoFocus}
        editable={editable}
        pointerEvents={editable ? 'auto' : 'none'}
        selectionColor={palletteColors.appPrimary}
      />
      {
        showClear && <TouchableOpacity
        onPress={onClear}
          style={styles.clrbtn}
        >
          <X size={15} />
        </TouchableOpacity>
      }
    </View>
  )

  if(onPress && !editable){
    return <TouchableOpacity onPress={onPress}>{content}</TouchableOpacity>
  }
  
  return content
}

export default SearchField

const searchStyle = (scale: LayoutScaleType, color: palleteColorsType) => {
  return StyleSheet.create({
    fieldWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: color.white,
      borderWidth: 2,
      borderRadius: 20
    },
    field: {
      fontSize: scale.md_16,
      padding: scale.ms_12,
      flex: 1
    },
    clrbtn: {
      marginEnd: scale.ms_12,
      borderColor: color.black,
      borderWidth: 1,
      borderRadius: 50,
      padding: scale.nano_2
    }
  })
}