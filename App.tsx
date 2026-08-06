import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import RootNavigation from './src/navigation/RootNavigation';
import { ThemeProvider } from './src/constants/theme/contextProvider/ThemeProvider';
import BottomSheetProvider from './src/components/bottomSheet/BottomSheetProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContextProvider } from './src/components/toast/ToastProvider';
import { AuthProvider } from './src/contexts/AuthContext';
import { LocationContextProvider } from './src/contexts/LocationContextProvider';

function App() {
  const queryClient = new QueryClient()
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <LocationContextProvider>
            <ToastContextProvider>
              <BottomSheetModalProvider>
                <ThemeProvider>
                  <BottomSheetProvider>
                    <RootNavigation />
                  </BottomSheetProvider>
                </ThemeProvider>
              </BottomSheetModalProvider>
            </ToastContextProvider>
          </LocationContextProvider>

        </AuthProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

export default App;