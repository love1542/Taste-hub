import React, { forwardRef, useMemo } from 'react';
import { Text } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

import { BottomSheetConfig } from './bottomSheetContext';
import { useTheme } from '../../constants/theme';

type AppBottomSheetProps = {
  config: BottomSheetConfig | null;
  onDismiss: () => void;
};

const AppBottomSheet = forwardRef<BottomSheetModal, AppBottomSheetProps>(({ 
    config,
    onDismiss }, ref) => {

      const {palletteColors, scale, typography, color} = useTheme()

    const snapPoints = useMemo(
      () => config?.snapPoints ?? ['50%'],
      [config?.snapPoints]
    );

    if (!config) {
      return null;
    }

    return (
      <BottomSheetModal
        ref={ref}
        index={config.index ?? 0}
        snapPoints={snapPoints}
        enablePanDownToClose={config.enablePanDownToClose ?? true}
        onDismiss={onDismiss}
      >
        <BottomSheetView style={{ flex: 1, padding: scale.ml_20 , backgroundColor: color.background}}>
          {config.title && (
            <Text
              style={[typography.subHeading, {paddingBottom: scale.ms_12, color: palletteColors.appPrimary}]}
            >
              {config.title}
            </Text>
          )}

          {config.content}
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

AppBottomSheet.displayName = 'AppBottomSheet';

export default AppBottomSheet;