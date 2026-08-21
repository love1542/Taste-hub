import { View } from 'react-native'
import React, { useState } from 'react'
import SearchField from './searchField/SearchField'
import { SafeAreaView } from 'react-native-safe-area-context'

type SheetProps = {
    
}

const SearchLocationSheet = ({ }: SheetProps) => {
  const [value, setValue] = useState<string>('')

  return (
    <View style={{ flex: 1 }}>
        <SafeAreaView />
      <SearchField
        value={value}
        placeholder="Search address..."
        onChange={setValue}
        onClear={() => {setValue('')}}
        autoFocus={true}
        borderColor='black'
      />
    </View>
  )
}

export default SearchLocationSheet