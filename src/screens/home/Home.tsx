import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';

import HomeHeader from './components/HomeHeader';
import { useAppBottomSheet } from '../../components/bottomSheet/hooks/useAppBottomSheet';
import SearchField from '../../components/searchField/SearchField';

const Home = () => {
  const [query, setQuery] = useState('')
  const { open } = useAppBottomSheet()

  const openSeachPress = () => {
    open({
      content: <View>
        <SearchField
          value={query}
          placeholder='Search Best Restraunt & Food'
          onChange={setQuery}
          onClear={() => { setQuery('') }}
          autoFocus={true}
        />
      </View>,
      snapPoints: ['100%'],
      enablePanDownToClose: true
    })
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <HomeHeader query={query} onOpenSearch={openSeachPress} />
        <Text>Home view</Text>
      </View>
    </TouchableWithoutFeedback>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
});

export default Home;
