import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import RootNavigation from './src/navigation/RootNavigation';
import { ThemeProvider } from './src/constants/theme/contextProvider/ThemeProvider';
import BottomSheetProvider from './src/components/bottomSheet/BottomSheetProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const queryClient = new QueryClient()
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
      <BottomSheetModalProvider>
        <ThemeProvider>
          <BottomSheetProvider>
              <RootNavigation />
          </BottomSheetProvider>
        </ThemeProvider>
      </BottomSheetModalProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

export default App;