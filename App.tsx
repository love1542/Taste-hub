import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import RootNavigation from './src/navigation/RootNavigation';
import { ThemeProvider } from './src/constants/theme/contextProvider/ThemeProvider';
import BottomSheetProvider from './src/components/bottomSheet/BottomSheetProvider';

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <ThemeProvider>
          <BottomSheetProvider>
              <RootNavigation />
          </BottomSheetProvider>
        </ThemeProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

export default App;